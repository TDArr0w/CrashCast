// pages/Landing.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapCenterContext } from '../context/MapCenterContext';

function Landing() {
  const [search, setSearch] = useState('');
  const { setMapCenter } = useContext(MapCenterContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search.trim()) {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}`);
      const results = await response.json();
      if (results[0]) {
        setMapCenter({
          lat: parseFloat(results[0].lat),
          lng: parseFloat(results[0].lon),
        });
        setSearch('');
        navigate('/home');
      } else {
        alert('Location not found. Please try a different search term.');
      }
    }
  };

  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="container">
          <h1>Welcome to CrashCast</h1>
          <p className="subtitle">Real-time traffic accident prediction and emergency resource monitoring</p>
        </div>
      </section>

      {/* Stats Carousel Section */}
      <section className="stats-carousel-section">
        <div className="container">
          <h2>Why Choose CrashCast?</h2>
          <div className="stats-carousel-container">
            <div className="stats-carousel-track">
              <div className="stat-box">
                <span className="stat-number">30%</span>
                <p className="stat-text">Reduction in emergency response time through predictive analytics</p>
              </div>
              <div className="stat-box">
                <span className="stat-number">24/7</span>
                <p className="stat-text">Real-time monitoring of traffic incidents and emergency resources</p>
              </div>
              <div className="stat-box">
                <span className="stat-number">500+</span>
                <p className="stat-text">Lives saved annually through early accident detection and rapid response</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Region Input Section */}
      <section className="region-input-section">
        <div className="container">
          <h2>Enter Your Region</h2>
          <form className="region-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Search for a city or address..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">Get Started</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Landing;