import React from 'react';

function MapContainer() {
  return (
    <section className="map-container">
      <h2>Live Traffic & Incident Map</h2>
      <div id="map-placeholder">
        
        {/* This is a placeholder popup */}
        <div className="map-popup">
          <strong>Major Accident</strong>
          <p>I-5 N, Mile 123 - Delays Expected</p>
        </div>

        {/* This div would be replaced by your interactive map */}
        <p className="map-text">Interactive Map Loads Here</p>

        <div className="map-legend">
          <strong>Legend</strong>
          <p><span className="legend-dot" style={{ backgroundColor: '#dc3545' }}></span> Heavy Traffic / Crash</p>
          <p><span className="legend-dot" style={{ backgroundColor: '#ffc107' }}></span> Moderate Traffic</p>
          <p><span className="legend-dot" style={{ backgroundColor: '#28a745' }}></span> Clear Traffic</p>
        </div>
      </div>
    </section>
  );
}

export default MapContainer;