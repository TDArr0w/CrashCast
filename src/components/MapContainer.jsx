import React, { useState, useCallback} from 'react';
import {APIProvider, Map} from '@vis.gl/react-google-maps';
import {DeckGL} from '@deck.gl/react';
import {HeatmapLayer} from '@deck.gl/aggregation-layers';

// Generate fake accident data for Seattle
const generateSeattleAccidentData = () => {
  const data = [];
  
  // Seattle high-risk areas (major intersections, highways, downtown)
  const hotspots = [
    // Downtown Seattle
    { lat: 47.6062, lng: -122.3321, intensity: 0.9 },
    { lat: 47.6097, lng: -122.3331, intensity: 0.8 },
    { lat: 47.6089, lng: -122.3356, intensity: 0.85 },
    
    // I-5 corridor
    { lat: 47.6205, lng: -122.3493, intensity: 0.7 },
    { lat: 47.6398, lng: -122.3421, intensity: 0.75 },
    { lat: 47.6587, lng: -122.3245, intensity: 0.8 },
    
    // Capitol Hill
    { lat: 47.6205, lng: -122.3212, intensity: 0.6 },
    { lat: 47.6243, lng: -122.3167, intensity: 0.65 },
    
    // Ballard
    { lat: 47.6685, lng: -122.3834, intensity: 0.7 },
    
    // University District
    { lat: 47.6587, lng: -122.3123, intensity: 0.6 },
    
    // West Seattle
    { lat: 47.5704, lng: -122.3861, intensity: 0.6 },
  ];

  // Generate data points around hotspots
  hotspots.forEach(hotspot => {
    const numPoints = Math.floor(hotspot.intensity * 30) + 15;
    
    for (let i = 0; i < numPoints; i++) {
      const radius = Math.random() * 0.008; // ~800m radius
      const angle = Math.random() * 2 * Math.PI;
      
      const lat = hotspot.lat + radius * Math.cos(angle);
      const lng = hotspot.lng + radius * Math.sin(angle);
      
      data.push({
        COORDINATES: [lng, lat],
        WEIGHT: Math.random() * hotspot.intensity + 0.1
      });
    }
  });

  // Add scattered random points
  for (let i = 0; i < 100; i++) {
    const lat = 47.4814 + Math.random() * (47.7341 - 47.4814);
    const lng = -122.4594 + Math.random() * (-122.2244 - (-122.4594));
    
    data.push({
      COORDINATES: [lng, lat],
      WEIGHT: Math.random() * 0.3
    });
  }

  return data;
};


function MapContainer() {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  //console.log('Using Google Maps API Key:', apiKey || 'No API Key Found');
  const accidentData = generateSeattleAccidentData();

  //shared view state between DeckGL and Google Maps
  const [viewState, setViewState] = useState({
    longitude: -122.3328,
    latitude: 47.6061,
    zoom: 13,
    pitch: 0,
    bearing: 0  
  })

  const onCameraChanged = useCallback((ev) => {
    const {center, zoom, pitch, bearing} = ev.detail;
    setViewState(prevState => ({
      ...prevState,
      longitude: center.lng,
      latitude: center.lat,
      zoom,
      pitch,
      bearing
    }) );
  }, []);

  const onViewStateChange = useCallback(({viewState: newViewState}) => {
    setViewState(newViewState);
  }, []);

  const heatmapLayer = new HeatmapLayer({
    id: 'accident-heatmap',
    data: accidentData,
    getPosition: d => d.COORDINATES,
    getWeight: d => d.WEIGHT,
    radiusPixels: 60,
    intensity: 1,
    threshold: 0.05,
    colorRange: [
      [255, 255, 204, 0],     // Transparent yellow
      [255, 237, 160, 80],    // Light yellow
      [254, 217, 118, 120],   // Yellow
      [254, 178, 76, 160],    // Orange
      [253, 141, 60, 200],    // Dark orange
      [252, 78, 42, 240],     // Red orange
      [227, 26, 28, 255],     // Red
      [177, 0, 38, 255]       // Dark red
    ]
  });
  return (
    <APIProvider apiKey={apiKey} onLoad={() => console.log('Maps API has loaded.')}>
      <section className="map-container">
        <h2>Live Traffic & Incident Map</h2>
        <div id="map-placeholder" style={{ height: '500px', width: '100%', position: 'relative' }}>
          <Map
            zoom={viewState.zoom}
            center={ { lat: viewState.latitude, lng: viewState.longitude } }
            onCameraChanged={ onCameraChanged }
            style ={{ height: '100%', width: '100%' }}>
            <DeckGL
              viewState={viewState}
              onViewStateChange={ onViewStateChange }
              layers={[heatmapLayer]}
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                width: '100%',
                height: '100%'
              }}
              getCursor={() => 'grab'}
              />
          </Map>

          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            fontSize: '12px',
            zIndex: 1000
          }}>
            <strong>Car Accident Risk</strong>
            <div style={{ 
              width: '100px', 
              height: '10px', 
              background: 'linear-gradient(to right, rgba(255,255,204,0.3), rgba(227,26,28,1))',
              marginTop: '5px',
              borderRadius: '2px'
            }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2px', fontSize: '10px' }}>
              <span>Low</span>
              <span>High</span>
            </div>
            <div style={{ marginTop: '5px', fontSize: '10px', color: '#666' }}>
              {accidentData.length} data points
            </div>
          </div>
        </div>
      </section>
    </APIProvider>
  );
}

export default MapContainer;