import json, urllib.parse, urllib.request

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
