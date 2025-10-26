import React from 'react';

const ambulanceData = [
  { id: 'AMB 147', status: 'Available - Station 3', type: 'available' },
  { id: 'AMB 088', status: 'En Route - Incident I-5 (ETA 5 min)', type: 'en-route' },
  { id: 'AMB 212', status: 'At Scene - Main St & Elm Ave', type: 'at-scene' },
  { id: 'AMB 102', status: 'Available - Station 1', type: 'available' },
];

function AmbulanceItem({ id, status, type }) {
  const isPulsing = type === 'at-scene' || type === 'en-route';
  return (
    <div className="ambulance-item">
      <span className={`status-dot ${type} ${isPulsing ? 'pulse' : ''}`}></span>
      <div className="ambulance-info">
        <strong>{id}</strong>
        <p>{status}</p>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 style={{ marginTop: '2rem' }}>Emergency Resources Status</h2>

      <div className="sidebar-widget">
        <h3>Available Ambulances</h3>
        <div className="ambulance-list">
          {ambulanceData.map((amb) => (
            <AmbulanceItem
              key={amb.id}
              id={amb.id}
              status={amb.status}
              type={amb.type}
            />
          ))}
        </div>
      </div>

      <div className="sidebar-widget">
        <h3>News/Alerts Feed</h3>
        <div className="alert-feed">
          <div className="alert-item">
            <strong>ALERT:</strong> I-5 Northbound closed at Exit 125 due to multi-vehicle collision. Seek alternate routes.
          </div>
          <div className="alert-item">
            <strong>INFO:</strong> Road construction on Main St starting 8:00 AM.
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;