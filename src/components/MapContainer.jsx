import React, { useState, useCallback, useMemo, useEffect} from 'react';
//import {APIProvider, Map} from '@vis.gl/react-google-maps';
//import {DeckGL} from '@deck.gl/react';
import {HeatmapLayer} from '@deck.gl/aggregation-layers';
import {APIProvider, Map, useMap} from '@vis.gl/react-google-maps';
//import {DeckProps} from '@deck.gl/core';
//import {ScatterplotLayer} from '@deck.gl/layers';
import {GoogleMapsOverlay} from '@deck.gl/google-maps';

// Generate fake accident data for Seattle
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
    { COORDINATES: [-122.3310, 47.6080], WEIGHT: 0.7 },
    { COORDINATES: [-122.3345, 47.6055], WEIGHT: 0.6 },

    // I-5 corridor
    { COORDINATES: [-122.3493, 47.6205], WEIGHT: 0.7 },
    { COORDINATES: [-122.3498, 47.6210], WEIGHT: 0.65 },
    { COORDINATES: [-122.3488, 47.6200], WEIGHT: 0.8 },
    { COORDINATES: [-122.3421, 47.6398], WEIGHT: 0.75 },
    { COORDINATES: [-122.3415, 47.6405], WEIGHT: 0.7 },
    { COORDINATES: [-122.3427, 47.6392], WEIGHT: 0.6 },
    { COORDINATES: [-122.3245, 47.6587], WEIGHT: 0.8 },
    { COORDINATES: [-122.3250, 47.6580], WEIGHT: 0.75 },
    { COORDINATES: [-122.3240, 47.6594], WEIGHT: 0.7 },
    { COORDINATES: [-122.3255, 47.6575], WEIGHT: 0.65 },

    // Capitol Hill
    { COORDINATES: [-122.3212, 47.6205], WEIGHT: 0.6 },
    { COORDINATES: [-122.3218, 47.6200], WEIGHT: 0.55 },
    { COORDINATES: [-122.3206, 47.6210], WEIGHT: 0.65 },
    { COORDINATES: [-122.3167, 47.6243], WEIGHT: 0.65 },
    { COORDINATES: [-122.3172, 47.6238], WEIGHT: 0.6 },
    { COORDINATES: [-122.3162, 47.6248], WEIGHT: 0.7 },
    { COORDINATES: [-122.3180, 47.6235], WEIGHT: 0.55 },
    { COORDINATES: [-122.3155, 47.6250], WEIGHT: 0.6 },

    // Ballard
    { COORDINATES: [-122.3834, 47.6685], WEIGHT: 0.7 },
    { COORDINATES: [-122.3840, 47.6680], WEIGHT: 0.65 },
    { COORDINATES: [-122.3828, 47.6690], WEIGHT: 0.75 },
    { COORDINATES: [-122.3845, 47.6675], WEIGHT: 0.6 },
    { COORDINATES: [-122.3822, 47.6695], WEIGHT: 0.7 },
    { COORDINATES: [-122.3850, 47.6670], WEIGHT: 0.55 },

    // University District
    { COORDINATES: [-122.3123, 47.6587], WEIGHT: 0.6 },
    { COORDINATES: [-122.3118, 47.6582], WEIGHT: 0.65 },
    { COORDINATES: [-122.3128, 47.6592], WEIGHT: 0.55 },
    { COORDINATES: [-122.3115, 47.6595], WEIGHT: 0.7 },
    { COORDINATES: [-122.3130, 47.6580], WEIGHT: 0.6 },
    { COORDINATES: [-122.3110, 47.6590], WEIGHT: 0.5 },

    // West Seattle
    { COORDINATES: [-122.3861, 47.5704], WEIGHT: 0.6 },
    { COORDINATES: [-122.3868, 47.5698], WEIGHT: 0.55 },
    { COORDINATES: [-122.3854, 47.5710], WEIGHT: 0.65 },
    { COORDINATES: [-122.3875, 47.5692], WEIGHT: 0.5 },
    { COORDINATES: [-122.3847, 47.5715], WEIGHT: 0.7 },

    // Highway 99
    { COORDINATES: [-122.3567, 47.6789], WEIGHT: 0.75 },
    { COORDINATES: [-122.3572, 47.6784], WEIGHT: 0.7 },
    { COORDINATES: [-122.3562, 47.6794], WEIGHT: 0.8 },
    { COORDINATES: [-122.3498, 47.6234], WEIGHT: 0.8 },
    { COORDINATES: [-122.3503, 47.6229], WEIGHT: 0.75 },
    { COORDINATES: [-122.3493, 47.6239], WEIGHT: 0.85 },

    // Georgetown/SODO
    { COORDINATES: [-122.3234, 47.5789], WEIGHT: 0.7 },
    { COORDINATES: [-122.3240, 47.5784], WEIGHT: 0.65 },
    { COORDINATES: [-122.3228, 47.5794], WEIGHT: 0.75 },
    { COORDINATES: [-122.3287, 47.5845], WEIGHT: 0.65 },
    { COORDINATES: [-122.3292, 47.5840], WEIGHT: 0.6 },
    { COORDINATES: [-122.3282, 47.5850], WEIGHT: 0.7 },

    // Additional scattered points
    { COORDINATES: [-122.3456, 47.6123], WEIGHT: 0.4 },
    { COORDINATES: [-122.3012, 47.6345], WEIGHT: 0.3 },
    { COORDINATES: [-122.3789, 47.6456], WEIGHT: 0.5 },
    { COORDINATES: [-122.3234, 47.6789], WEIGHT: 0.35 },
    { COORDINATES: [-122.3567, 47.5234], WEIGHT: 0.45 },
    { COORDINATES: [-122.3890, 47.6012], WEIGHT: 0.4 },
    { COORDINATES: [-122.3123, 47.6678], WEIGHT: 0.3 },
    { COORDINATES: [-122.3445, 47.5789], WEIGHT: 0.5 },
    { COORDINATES: [-122.3678, 47.6234], WEIGHT: 0.35 },
    { COORDINATES: [-122.3012, 47.5890], WEIGHT: 0.4 },
    { COORDINATES: [-122.3789, 47.6567], WEIGHT: 0.45 },
    { COORDINATES: [-122.3234, 47.5678], WEIGHT: 0.3 },
    { COORDINATES: [-122.3567, 47.6890], WEIGHT: 0.5 },
    { COORDINATES: [-122.3890, 47.5234], WEIGHT: 0.35 },
    { COORDINATES: [-122.3123, 47.6345], WEIGHT: 0.4 },
    { COORDINATES: [-122.3445, 47.5567], WEIGHT: 0.45 },
    { COORDINATES: [-122.3678, 47.6789], WEIGHT: 0.3 },
    { COORDINATES: [-122.3012, 47.5234], WEIGHT: 0.5 },
    { COORDINATES: [-122.3789, 47.6012], WEIGHT: 0.35 },
    { COORDINATES: [-122.3234, 47.5890], WEIGHT: 0.4 },
    { COORDINATES: [-122.3567, 47.6567], WEIGHT: 0.45 },
    { COORDINATES: [-122.3890, 47.5678], WEIGHT: 0.3 },
    { COORDINATES: [-122.3123, 47.6890], WEIGHT: 0.5 },
    { COORDINATES: [-122.3445, 47.5234], WEIGHT: 0.35 },
    { COORDINATES: [-122.3678, 47.6345], WEIGHT: 0.4 },
    { COORDINATES: [-122.3012, 47.5567], WEIGHT: 0.45 },
    { COORDINATES: [-122.3789, 47.6789], WEIGHT: 0.3 },
    { COORDINATES: [-122.3234, 47.5234], WEIGHT: 0.5 }
  ];
  return data;
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

// Deck.gl overlay bound to the current Google Map
function DeckGLOverlay({layers}) {
  const map = useMap();
  const overlay = useMemo(() => new GoogleMapsOverlay({layers}), []);

  useEffect(() => {
    if (!map) return;
    overlay.setMap(map);
    return () => overlay.setMap(null);
  }, [map, overlay]);

  useEffect(() => {
    overlay.setProps({layers});
  }, [overlay, layers]);

  return null;
}

function MapContainer() {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const mapId = import.meta.env.VITE_GOOGLE_MAP_ID;

   if (!mapId) {
    // WebGLOverlayView requires a vector basemap (Map ID). Without it, the overlay may not render.
    // Create a Web map ID in Google Cloud Console and set VITE_GOOGLE_MAP_ID.
    console.warn('No VITE_GOOGLE_MAP_ID set. Use a vector map ID for deck.gl overlay.');
  }

  const accidentData = useMemo(() => generateSeattleAccidentData(), []);


  const layers = useMemo(() => ([
    new HeatmapLayer({
    id: 'accident-heatmap',
    data: accidentData,
    getPosition: d => d.COORDINATES,
    getWeight: d => d.WEIGHT,
    radiusPixels: 60,
    intensity: 1,
    threshold: 0.05,
    colorRange: COLOR_RANGE,
    //gpuAggregation: false,
    //pickable: false
  })
  ]), [accidentData]);

  return (
    <APIProvider apiKey={apiKey} onLoad={() => console.log('Maps API has loaded.')}>
      <section className="map-container">
        <h2>Live Traffic & Incident Map</h2>
        <div id="map-placeholder" style={{ height: '500px', width: '100%', position: 'relative' }}>
          <Map
            defaultZoom={13}
            defaultCenter={{lat: 47.6061, lng: -122.3328}}
            mapId={mapId}
            style={{ height: '100%', width: '100%' }}
            >
              <DeckGLOverlay layers={[layers]} />
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