import json, os, random, urllib.parse, urllib.request
from get_places import get_essential_buildings_for_city

DEFAULT_POINT_COUNT = int(os.getenv("DEFAULT_POINT_COUNT", "50"))


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
