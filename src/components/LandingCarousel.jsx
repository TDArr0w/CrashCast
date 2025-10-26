import React from 'react';
import '../styles/LandingCarousel.css';
import LandingAmbulance from './LandingAmbulance';

// This is the placeholder for your "Stats Carousel" from last time
const StatsCarouselPlaceholder = () => (
  <div style={{
    position: 'absolute',
    top: '60%', // Pushed down a bit
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1, // <-- 1. At the very bottom
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '20px',
    borderRadius: '15px',
    textAlign: 'center',
    color: 'var(--text-color, #000)',
    width: '300px'
  }}>
    <h3>City-Wide Stats</h3>
    
  </div>
);


const LandingCarousel = ({
  size = 3500,
  rotationSpeed = 35,
  roadThickness = 160,
  stripeWidth = 14,
  dashLengthDeg = 10,
  gapLengthDeg = 16,
  arcHeight = 305,
  arcOffset = 2.8,
}) => {
  return (
    <div className="landing-carousel-container" style={{ height: `${arcHeight}px`, position: "relative" }}>
      
      {/* 1. STATS COMPONENT (z-index: 1) */}
      <StatsCarouselPlaceholder />

      {/* 2. PROMINENT WELCOME MESSAGE (z-index: 3) */}
      <div style={{
        position: 'absolute',
        top: '40%', // Centered vertically
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 3, // <-- 3. Above the road, below the ambulance
        textAlign: 'center',
        color: 'var(--text-color, #FFF)', // Respects dark/light mode
        width: '100%'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 4rem)', // Responsive font size
          fontWeight: 'bold',
          textShadow: '0 4px 15px rgba(0,0,0,0.4)', // Pop effect
          margin: 0
        }}>

        </h1>
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.5rem)',
          textShadow: '0 2px 10px rgba(0,0,0,0.3)',
          opacity: 0.9
        }}>
          
        </p>
      </div>
      
      {/* 3. SVG ROAD (z-index: 2) */}
      <svg
        viewBox="0 6 100 30"
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: "100%",
          height: "100%",
          transform: "scale(2)",
          overflow: "visible", 
          transformOrigin: "top",
          position: "relative", // <-- ADD: Creates stacking context
          zIndex: 2, // <-- CHANGE: Was -999, now 2
        }}
      >
        <circle cx="50" cy="50" r="40" stroke="#222" strokeWidth="10" fill="none" />
        <circle cx="50" cy="50" r="40" stroke="white" strokeDasharray="5 4" strokeWidth="1" fill="none">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="360 50 50" 
            to="0 50 50"
            dur={`${rotationSpeed}s`}
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      
      {/* 4. AMBULANCE (z-index: 4) */}
      <LandingAmbulance />
    </div>
  );
};

export default LandingCarousel;