import React from 'react';
import {APIProvider, Map} from '@vis.gl/react-google-maps';

function MapContainer() {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  console.log('Using Google Maps API Key:', apiKey || 'No API Key Found');

  return (
    <APIProvider apiKey={apiKey} onLoad={() => console.log('Maps API has loaded.')}>
      <section className="map-container">
        <h2>Live Traffic & Incident Map</h2>
        <div id="map-placeholder">
          <Map
            defaultZoom={13}
            defaultCenter={ { lat: 47.6061, lng: -122.3328 } }
            onCameraChanged={ (ev) =>
              console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
            }>
          </Map>
        </div>
      </section>
    </APIProvider>
  );
}

export default MapContainer;