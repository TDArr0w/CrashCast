import json, os, math, time, urllib.parse, urllib.request
from io import StringIO
import csv
import numpy as np

# If packaging with Lambda layer, include scikit-learn wheel; else use a simple Gaussian fall-back
USE_SKLEARN = True
try:
    from sklearn.neighbors import KernelDensity
except Exception:
    USE_SKLEARN = False

UA = "CrashCast/1.0 (contact: you@example.com)"  # set a real contact
DEFAULT_K = int(os.getenv("DEFAULT_K", "25"))
GRID_N = int(os.getenv("GRID_N", "200"))  # grid resolution per axis
BANDWIDTH_M = float(os.getenv("BANDWIDTH_M", "250"))  # KDE bandwidth in meters

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
    # Overpass wants: south,west,north,east
    south, west, north, east = bbox

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


def nominatim_bbox(city: str):
    q = urllib.parse.urlencode({"q": city, "format": "json", "limit": 1})
    req = urllib.request.Request(
        f"https://nominatim.openstreetmap.org/search?{q}", headers={"User-Agent": UA}
    )
    with urllib.request.urlopen(req, timeout=10) as r:
        data = json.loads(r.read().decode("utf-8"))
    if not data:
        raise ValueError("City not found")
    bb = data[0]["boundingbox"]  # [south, north, west, east] as strings
    south, north, west, east = map(float, [bb[0], bb[1], bb[2], bb[3]])
    return south, west, north, east


def meters_per_deg(lat_deg: float):
    # Approx conversion near given latitude
    lat_rad = math.radians(lat_deg)
    m_per_deg_lat = (
        111132.92 - 559.82 * math.cos(2 * lat_rad) + 1.175 * math.cos(4 * lat_rad)
    )
    m_per_deg_lon = 111412.84 * math.cos(lat_rad) - 93.5 * math.cos(3 * lat_rad)
    return m_per_deg_lat, m_per_deg_lon


def gaussian_kde_fallback(points, grid_xy, bandwidth_m, lat0):
    import numpy as np

    if points.size == 0:
        return np.zeros(len(grid_xy), dtype=np.float64)

    mlat, mlon = meters_per_deg(lat0)
    bw_lat = bandwidth_m / mlat
    bw_lon = bandwidth_m / mlon
    inv_2sig2_lat = 1.0 / (2.0 * bw_lat * bw_lat)
    inv_2sig2_lon = 1.0 / (2.0 * bw_lon * bw_lon)

    py = points[:, 0][None, :]  # (1, N)
    px = points[:, 1][None, :]  # (1, N)
    gy = grid_xy[:, 0][:, None]  # (M, 1)
    gx = grid_xy[:, 1][:, None]  # (M, 1)

    dy2 = (py - gy) ** 2  # (M, N)
    dx2 = (px - gx) ** 2  # (M, N)

    # sum over points axis=1 -> (M,)
    return np.exp(-dy2 * inv_2sig2_lat - dx2 * inv_2sig2_lon).sum(axis=1)


def non_max_suppression(latlon_scores, min_separation_m=200, lat0=0.0):
    # Greedy pick top, suppress neighbors within radius
    picked = []
    used = np.zeros(len(latlon_scores), dtype=bool)
    mlat, mlon = meters_per_deg(lat0)
    rad_lat = min_separation_m / mlat
    rad_lon = min_separation_m / mlon
    order = np.argsort(-latlon_scores[:, 2])
    coords = latlon_scores[:, :2]
    for idx in order:
        if used[idx]:
            continue
        picked.append(idx)
        dy = (coords[:, 0] - coords[idx, 0]) / rad_lat
        dx = (coords[:, 1] - coords[idx, 1]) / rad_lon
        mask = (dy * dy + dx * dx) <= 1.0
        used[mask] = True
    return picked


def load_city_crashes(city: str):
    """
    Replace this with:
    - Read from S3 (boto3) prefiltered per-city, OR
    - Download a public CSV for the city for your demo
    Must return Nx2 numpy array: [[lat, lon], ...]
    """
    # DEMO: tiny inline sample (replace immediately!)
    sample = [
        (47.61, -122.34),
        (47.61, -122.33),
        (47.60, -122.33),
        (47.62, -122.32),
        (47.61, -122.31),
        (47.605, -122.335),
        (47.608, -122.336),
        (47.612, -122.329),
        (47.599, -122.334),
    ]
    return np.array(sample, dtype=np.float64)


def lambda_handler(event, context):
    """
    params = event.get("queryStringParameters") or {}
    city = params.get("city", "Seattle")
    k = int(params.get("k", DEFAULT_K))
    """
    city = event["city"]
    k = event["k"]

    south, west, north, east = nominatim_bbox(city)
    lat0 = 0.5 * (south + north)

    pts = load_city_crashes(city)  # Nx2 [lat, lon]
    if pts.size == 0:
        return {
            "statusCode": 200,
            "body": json.dumps({"features": [], "type": "FeatureCollection"}),
        }

    # Build grid
    grid_y = np.linspace(south, north, GRID_N)
    grid_x = np.linspace(west, east, GRID_N)
    gy, gx = np.meshgrid(grid_y, grid_x, indexing="ij")
    grid_flat = np.column_stack([gy.ravel(), gx.ravel()])  # [lat, lon]

    # KDE
    if USE_SKLEARN:
        mlat, mlon = meters_per_deg(lat0)
        bw_lat = BANDWIDTH_M / mlat
        bw_lon = BANDWIDTH_M / mlon
        # scale lon by bw_lon/bw_lat so isotropic kernel in scaled space
        pts_scaled = np.column_stack([pts[:, 0], pts[:, 1] * (bw_lat / bw_lon)])
        grid_scaled = np.column_stack(
            [grid_flat[:, 0], grid_flat[:, 1] * (bw_lat / bw_lon)]
        )
        kde = KernelDensity(bandwidth=bw_lat, kernel="gaussian")
        kde.fit(pts_scaled)
        scores = np.exp(kde.score_samples(grid_scaled))
    else:
        scores = gaussian_kde_fallback(pts, grid_flat, BANDWIDTH_M, lat0)

    latlon_scores = np.column_stack([grid_flat[:, 0], grid_flat[:, 1], scores])

    # Non-max suppression to space points out
    keep = non_max_suppression(latlon_scores, min_separation_m=250, lat0=lat0)
    top = latlon_scores[keep]
    top = top[np.argsort(-top[:, 2])][:k]

    features = []
    for lat, lon, s in top:
        features.append(
            {
                "type": "Feature",
                "geometry": {"type": "Point", "coordinates": [float(lon), float(lat)]},
                "properties": {"score": float(s), "city": city},
            }
        )

    try:
        buildings = get_essential_buildings_for_city([south, west, north, east], city)
    except:
        buildings = ""

    body = {
        "type": "FeatureCollection",
        "version": "v1",
        "query": {"city": city},
        "bbox": [south, west, north, east],
        "features": features,
        "essential_buildings": buildings,
    }

    return {"statusCode": 200, "body": json.dumps(body)}


if __name__ == "__main__":
    print(lambda_handler({"city": "houston", "k": 20}, None))
