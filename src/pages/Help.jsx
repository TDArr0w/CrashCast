import React from 'react'

function Help() {
  return (
    <div style={{ width: '100%' }}>
      <section className="sidebar-widget">
        <h2>Help & User Guide</h2>
        <p>
          Welcome to <strong>CrashCast</strong> — a predictive ambulance dispatch platform. This guide
          walks you through the system.
        </p>
      </section>

      <section className="sidebar-widget">
        <h3>1. Overview</h3>
        <p>The Home page shows a predictive map and ambulance status list.</p>
      </section>

      <section className="sidebar-widget">
        <h3>2. Using the Predictive Map</h3>
        <p>Red zones = high risk, orange = medium, grey = low. Place ambulances accordingly.</p>
      </section>

      <section className="sidebar-widget">
        <h3>3. Ambulance Status Indicators</h3>
        <ul>
          <li><span className="status-dot available"></span> Available</li>
          <li><span className="status-dot en-route"></span> En Route</li>
          <li><span className="status-dot at-scene"></span> At Scene</li>
        </ul>
      </section>

      <section className="sidebar-widget">
        <h3>4. Alerts & Feed</h3>
        <p>Stay updated with real-time alerts on incidents and road closures.</p>
      </section>

      <section className="sidebar-widget">
        <h3>5. Troubleshooting & Support</h3>
        <ul>
          <li>Check internet connection.</li>
          <li>Ensure API key is active.</li>
          <li>Contact <a href="mailto:support@crashcast.io">support@crashcast.io</a>.</li>
        </ul>
      </section>
    </div>
  )
}

export default Help
