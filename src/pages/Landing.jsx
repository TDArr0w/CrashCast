import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapCenterContext } from '../context/MapCenterContext';
import LandingCarousel from '../components/LandingCarousel';
const stats = [
  { number: '7%', text: 'Increase in fatalities for every 10-minute increase in ambulance journey time.' },
  { number: '2.6%', text: 'Increase in crash fatality odds for every 1-minute increase in EMS response time.' },
  { number: '$340B', text: 'Annual cost of motor vehicle crashes in the U.S. in 2019.' },
  { number: '10s', text: 'Frequency of a car crash involving an injury in the U.S.' },
];

function Landing() {
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [search, setSearch] = useState('');
  const { searchLocation } = useContext(MapCenterContext);
  const navigate = useNavigate();

  // Carousel auto-rotation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prevIndex) => (prevIndex + 1) % stats.length);
    }, 5000); // Change stat every 5 seconds (5000ms)

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search.trim()) {
      const found = await searchLocation(search);
      setSearch('');
      if (found) navigate('/home');
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

      {/* end of top carousel */}
      <LandingCarousel />
      
      <section className="region-input-section">
        <h2>See Your Region’s Potential</h2>
        <form onSubmit={handleSubmit} className="region-form">
          <input
            type="text"
            placeholder="Enter your city or region (e.g., 'San Francisco')"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
            aria-label="Enter your region"
          />
          <button type="submit" className="btn btn-primary">
            Analyze Now
          </button>
        </form>
      </section>
    </div>
  );
};

export default Landing;