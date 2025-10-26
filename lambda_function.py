import json, os, random, urllib.parse, urllib.request

DEFAULT_POINT_COUNT = int(os.getenv("DEFAULT_POINT_COUNT", "50"))

OVERPASS_URL = "https://overpass-api.de/api/interpreter"
OVERPASS_UA = "CrashCast/1.0 (contact: you@example.com)"  # <-- put a real contact


def get_essential_buildings_for_city(bbox, city):
    """
    Returns a dict:
    {
      "hospitals": FeatureCollection,
      "emt_stations": FeatureCollection
    }
    """
    min_lon, min_lat, max_lon, max_lat = bbox
    # Overpass wants: south,west,north,east
    south, west, north, east = min_lat, min_lon, max_lat, max_lon

    hospitals = _overpass_pois(
        south,
        west,
        north,
        east,
        # Hospitals (both classic tagging and healthcare=* where relevant)
        selectors=['["amenity"="hospital"]', '["healthcare"="hospital"]'],
    )

    ems = _overpass_pois(
        south,
        west,
        north,
        east,
        # Ambulance/EMS stations; some locales tag as emergency=ambulance_station
        # and some as amenity=emergency or emergency_services; include a couple fallbacks.
        selectors=[
            '["emergency"="ambulance_station"]',
            '["amenity"="ambulance_station"]',
            '["emergency"="service"]',  # rare, but catches a few EMS bases
        ],
    )

    return {
        "hospitals": _as_feature_collection(hospitals, category="hospital", city=city),
        "emt_stations": _as_feature_collection(ems, category="emt_station", city=city),
    }


def _overpass_pois(south, west, north, east, selectors):
    """
    Query nodes/ways/relations that match any selector in the bbox.
    Returns a list of dicts with lon/lat + tags.
    """
    # Build a union of N/W/R for each selector, then out center to get a point for ways/relations.
    parts = []
    for sel in selectors:
        bbox_str = f"({south},{west},{north},{east})"
        parts.append(f"node{sel}{bbox_str};")
        parts.append(f"way{sel}{bbox_str};")
        parts.append(f"relation{sel}{bbox_str};")

    q = f"""
    [out:json][timeout:25];
    (
      {"".join(parts)}
    );
    out center tags;
    """
    data = urllib.parse.urlencode({"data": q}).encode("utf-8")
    req = urllib.request.Request(
        OVERPASS_URL,
        data=data,
        headers={
            "User-Agent": OVERPASS_UA,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        payload = json.loads(resp.read().decode("utf-8"))

    results = []
    for el in payload.get("elements", []):
        lon, lat = None, None
        if "lon" in el and "lat" in el:  # node
            lon, lat = el["lon"], el["lat"]
        elif "center" in el:  # way/relation
            lon, lat = el["center"].get("lon"), el["center"].get("lat")

        if lon is None or lat is None:
            continue

        tags = el.get("tags", {})
        results.append(
            {
                "id": f'{el.get("type","")}/{el.get("id","")}',
                "lon": lon,
                "lat": lat,
                "name": tags.get("name"),
                "tags": tags,
            }
        )
    return results


def _as_feature_collection(items, category: str, city: str):
    feats = []
    for i, p in enumerate(items):
        props = {
            "category": category,
            "name": p.get("name"),
            "source": "osm",
            "osm_id": p.get("id"),
            "city": city,
        }
        # add a few nice-to-have address fields if present
        t = p.get("tags", {})
        for k in (
            "addr:housenumber",
            "addr:street",
            "addr:city",
            "addr:postcode",
            "phone",
        ):
            if k in t:
                props[k.replace("addr:", "addr_")] = t[k]

        feats.append(
            {
                "type": "Feature",
                "id": f"{category}_{i}",
                "geometry": {"type": "Point", "coordinates": [p["lon"], p["lat"]]},
                "properties": props,
            }
        )

    return {"type": "FeatureCollection", "features": feats}


# ---------------------------------------------------------------------------------------- #
def lambda_handler(event, context):
    # --- Parse query params ---
    city_raw = "paris"
    n_points = int(50)

    if not city_raw:
        return _response(400, {"error": "Missing required query param: city"})

    city = urllib.parse.unquote(city_raw)

    # --- Get bbox for city ---
    bbox = get_city_bbox(city)  # [minLon, minLat, maxLon, maxLat]
    if not bbox:
        return _response(404, {"error": f"Could not find bbox for city '{city}'"})

    # --- Generate random points ---
    features = []
    min_lon, min_lat, max_lon, max_lat = bbox
    for i in range(n_points):
        lon = random.uniform(min_lon, max_lon)
        lat = random.uniform(min_lat, max_lat)
        weight = round(random.uniform(0.3, 1.0), 2)
        features.append(
            {
                "type": "Feature",
                "id": f"rnd_{i}",
                "geometry": {"type": "Point", "coordinates": [lon, lat]},
                "properties": {"weight": weight},
            }
        )

    body = {
        "type": "FeatureCollection",
        "version": "v1",
        "query": {"city": city, "n": n_points},
        "bbox": bbox,
        "features": features,
        "essential_buildings": get_essential_buildings_for_city(bbox, city),
    }

    return _response(200, body)


def get_city_bbox(city: str):
    """
    Fetch a city's bounding box using OpenStreetMap Nominatim.
    Returns [minLon, minLat, maxLon, maxLat] or None.
    """
    # Quick static fallback for common cities (optional, fast & free)
    STATIC_BBOX = {
        "seattle": [-122.459696, 47.481002, -122.224433, 47.734136],
        "san francisco": [-122.514926, 37.708075, -122.357031, 37.832371],
        "new york": [-74.25909, 40.477399, -73.700272, 40.917577],
    }
    key = city.lower()
    if key in STATIC_BBOX:
        return STATIC_BBOX[key]

    # Nominatim query
    params = urllib.parse.urlencode({"q": city, "format": "json", "limit": 1})
    url = f"https://nominatim.openstreetmap.org/search?{params}"
    req = urllib.request.Request(
        url,
        headers={
            # Nominatim requires a valid UA + contact; replace with yours
            "User-Agent": "CrashCast/1.0 (contact: emailhere)"
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except Exception:
        return None

    if not data:
        return None

    # Nominatim boundingbox order: [south, north, west, east] as strings
    bb = data[0].get("boundingbox")
    if not bb or len(bb) != 4:
        return None

    south, north, west, east = map(float, bb)
    # Return [minLon, minLat, maxLon, maxLat]
    return [west, south, east, north]


def _response(status, body_dict):
    return {
        "statusCode": status,
        "headers": {
            "Content-Type": (
                "application/geo+json" if status == 200 else "application/json"
            ),
            "Access-Control-Allow-Origin": "*",  # tighten later
            "Cache-Control": "no-store",
        },
        "body": json.dumps(body_dict),
    }


if __name__ == "__main__":
    lambda_handler(None, None)
