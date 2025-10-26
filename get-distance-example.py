import requests
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")
print(api_key)


def get_distance_time(
    origin_lat, origin_lng, dest_lat, dest_lng, mode="driving", units="metric"
):
    url = "https://maps.googleapis.com/maps/api/distancematrix/json"
    params = {
        "origins": f"{origin_lat},{origin_lng}",
        "destinations": f"{dest_lat},{dest_lng}",
        "mode": mode,
        "units": units,
        "key": api_key,
    }
    resp = requests.get(url, params=params, timeout=10)
    resp.raise_for_status()
    data = resp.json()
    # Check status
    if data.get("status") != "OK":
        raise RuntimeError(f"API error: {data.get('status')} / {data}")
    # Usually one origin and one destination
    element = data["rows"][0]["elements"][0]
    if element.get("status") != "OK":
        raise RuntimeError(f"Element status not OK: {element}")
    distance_m = element["distance"]["value"]
    duration_s = element["duration"]["value"]
    distance_text = element["distance"]["text"]
    duration_text = element["duration"]["text"]
    return {
        "distance_m": distance_m,
        "duration_s": duration_s,
        "distance_text": distance_text,
        "duration_text": duration_text,
    }


# Example use:
if __name__ == "__main__":
    origin = (37.7749, -122.4194)
    dest = (34.0522, -118.2437)
    result = get_distance_time(
        origin_lat=origin[0],
        origin_lng=origin[1],
        dest_lat=dest[0],
        dest_lng=dest[1],
    )
    print("Distance:", result["distance_text"], "Duration:", result["duration_text"])
