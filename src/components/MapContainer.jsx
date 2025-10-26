import React, { useState, useCallback, useMemo, useEffect, useContext, Children } from 'react';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { MapCenterContext } from '../context/MapCenterContext';

// ---- Fake Accident Data ----
const generateSeattleAccidentData = () => {
  return [
    // Downtown Seattle cluster
    { COORDINATES: [-122.3321, 47.6062], WEIGHT: 0.9 },
    { COORDINATES: [-122.3315, 47.6058], WEIGHT: 0.8 },
    { COORDINATES: [-122.3327, 47.6065], WEIGHT: 0.7 },
    { COORDINATES: [-122.3331, 47.6097], WEIGHT: 0.8 },
    { COORDINATES: [-122.3325, 47.6102], WEIGHT: 0.6 },
    { COORDINATES: [-122.3337, 47.6092], WEIGHT: 0.7 },
    { COORDINATES: [-122.3356, 47.6089], WEIGHT: 0.85 },
    { COORDINATES: [-122.3362, 47.6084], WEIGHT: 0.75 },
    { COORDINATES: [-122.3350, 47.6094], WEIGHT: 0.65 },
    { COORDINATES: [-122.3340, 47.6070], WEIGHT: 0.8 },
  
    // Additional sample areas...
    { COORDINATES: [-122.3493, 47.6205], WEIGHT: 0.7 },
    { COORDINATES: [-122.3245, 47.6587], WEIGHT: 0.8 },
    { COORDINATES: [-122.3212, 47.6205], WEIGHT: 0.6 },
    { COORDINATES: [-122.3834, 47.6685], WEIGHT: 0.7 },
    { COORDINATES: [-122.3123, 47.6587], WEIGHT: 0.6 },
    { COORDINATES: [-122.3861, 47.5704], WEIGHT: 0.6 },
    { COORDINATES: [-122.3567, 47.6789], WEIGHT: 0.75 },
    { COORDINATES: [-122.3234, 47.5789], WEIGHT: 0.7 },
    { COORDINATES: [-122.3456, 47.6123], WEIGHT: 0.4 },
    { COORDINATES: [-122.3789, 47.6456], WEIGHT: 0.5 },
  ];
};

const COLOR_RANGE = [
  [255, 255, 204, 0],
  [255, 237, 160, 80],
  [254, 217, 118, 120],
  [254, 178, 76, 160],
  [253, 141, 60, 200],
  [252, 78, 42, 240],
  [227, 26, 28, 255],
  [177, 0, 38, 255]
];

async function generateCoordinates(city) {
  const res = await fetch(`https://n6obibc9w6.execute-api.us-east-1.amazonaws.com/get-crash-regions?city=${city}`);
  console.log("Fetch response: ", res);
  const data = await res.json();
  return data.features.map(feature => ({
    COORDINATES: feature.geometry.coordinates,
    WEIGHT: feature.properties.weight
  }));
}

// ---- Deck.gl Overlay ----
function DeckGLOverlay({ layers }) {
  const map = useMap();
  const [overlay] = useState(() => new GoogleMapsOverlay({
    interleaved: false,
  }));

  useEffect(() => {
    overlay.setProps({ layers });
  }, [overlay, layers]);

  useEffect(() => {
    if (map) overlay.setMap(map);
    return () => overlay.setMap(null);
  }, [map, overlay]);

  return null;
}

function MapContent({ mapCenter, camState, handleCameraChange, layers}) {
  const map = useMap();

  useEffect(() => {
    if (map && mapCenter) {
      map.panTo(mapCenter);
    }
  }, [mapCenter, map]);

  return (
    <Map
      defaultZoom={13}
      defaultCenter={{ lat: mapCenter.lat, lng: mapCenter.lng }}
      mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
      style={{ height: '100%', width: '100%' }}
      onCameraChanged={handleCameraChange}
    >
      <DeckGLOverlay layers={layers} />
    </Map>
  );
}

// ---- Map Container ----
function MapContainer() {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const { mapCenter, city } = useContext(MapCenterContext);

  const [camState, setCamState] = useState({
    zoom: 13,
    center: { lat: 47.6061, lng: -122.3328 }
  });
  //console.log("City is: ", city);

  const [accidentData, setAccidentData] = useState([]);
  useEffect(() => {
    generateCoordinates(city).then(setAccidentData);
  }, [city]);

  const layers = useMemo(() => {
    // Adjust radius based on zoom level for a consistent appearance
    const radiusPixels = Math.max(10, 60 - (camState.zoom - 13) * 5);

    return [
      new HeatmapLayer({
        id: 'accident-heatmap', // Use a stable ID
        data: accidentData,
        getPosition: d => d.COORDINATES,
        getWeight: d => d.WEIGHT,
        radiusPixels, // Use the dynamically calculated radius
        intensity: 1,
        threshold: 0.03,
        colorRange: COLOR_RANGE,
        aggregation: 'SUM',
        gpuAggregation: true,
      })
    ];
  }, [accidentData, camState.zoom]); // Re-calculate only on zoom change

  const handleCameraChange = useCallback(ev => setCamState(ev.detail), []);

  return (
    <APIProvider apiKey={apiKey} onLoad={() => console.log('Maps API Loaded')}>
      <section className="map-container">
        <h2>Live Traffic & Incident Map</h2>
        <div
          id="map-placeholder"
          style={{
            height: '500px',
            width: '100%',
            position: 'relative'
          }}
        >
          <MapContent
            mapCenter={mapCenter}
            camState={camState}
            handleCameraChange={handleCameraChange}
            layers={layers}
          />
          {/* Legend UI */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '10px',
              borderRadius: '5px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              fontSize: '12px',
              zIndex: 1000
            }}
          >
            <strong>Car Accident Risk</strong>
            <div
              style={{
                width: '100px',
                height: '10px',
                background:
                  'linear-gradient(to right, rgba(255,255,204,0.3), rgba(227,26,28,1))',
                marginTop: '5px',
                borderRadius: '2px'
              }}
            ></div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '2px',
                fontSize: '10px'
              }}
            >
              <span>Low</span>
              <span>High</span>
            </div>
            <div
              style={{
                marginTop: '5px',
                fontSize: '10px',
                color: '#666'
              }}
            >
              {accidentData.length} data points
            </div>
          </div>
        </div>
      </section>
    </APIProvider>
  );
}

export default MapContainer;
