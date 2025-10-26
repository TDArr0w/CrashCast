import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingCarousel from '../components/LandingCarousel';

const stats = [
  { number: '7%', text: 'Increase in fatalities for every 10-minute increase in ambulance journey time.' },
  { number: '2.6%', text: 'Increase in crash fatality odds for every 1-minute increase in EMS response time.' },
  { number: '$340B', text: 'Annual cost of motor vehicle crashes in the U.S. in 2019.' },
  { number: '10s', text: 'Frequency of a car crash involving an injury in the U.S.' },
];

function Landing() {
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [region, setRegion] = useState('');
  const navigate = useNavigate();

  // Carousel auto-rotation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prevIndex) => (prevIndex + 1) % stats.length);
    }, 5000); // Change stat every 5 seconds (5000ms)

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (region.trim()) {
      // Navigate to /home and pass the region as a query parameter
      navigate(`/home?region=${encodeURIComponent(region.trim())}`);
    }
  };

  return (
    <div className="landing-page">
      <section className="hero-section">
        <h1>Predictive Dispatch for Life-Saving Response.</h1>
        <p className="subtitle">
          Turn a 10-minute response into a 2-minute advantage. CrashCast uses predictive modeling to pre-position resources,
          saving lives and valuable time.
        </p>
      </section>
{/* This is the carousel yeah yeah */}
      <section className="stats-carousel-section">
        <div className="stats-carousel-container">
          <div className="stats-carousel-track" style={{ transform: `translateX(-${currentStatIndex * 100}%)` }}>
            {stats.map((stat, index) => (
              <div key={index} className="stat-box">
                <span className="stat-number">{stat.number}</span>
                <p className="stat-text">{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* end of top carousel */}
      <LandingCarousel />
      
      <section className="region-input-section">
        <h2>See Your Region’s Potential</h2>
        <form onSubmit={handleSubmit} className="region-form">
          <input
            type="text"
            placeholder="Enter your city or region (e.g., 'San Francisco')"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
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
}

export default Landing;