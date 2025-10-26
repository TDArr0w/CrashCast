import React from 'react';
import '../styles/LandingCarousel.css';
import LandingAmbulance from './LandingAmbulance';

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
      <svg
  viewBox="0 6 100 30"
  preserveAspectRatio="xMidYMid meet"
  style={{
    width: "100%",
    height: "100%",
    transform: "scale(2)",
    overflow: "visible", 
    transformOrigin: "top",
  }}
>
        <circle cx="50" cy="50" r="40" stroke="#222" strokeWidth="10" fill="none" />
        <circle cx="50" cy="50" r="40" stroke="white" strokeDasharray="5 4" strokeWidth="1" fill="none">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur={`${rotationSpeed}s`}
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      <LandingAmbulance />
    </div>
  );
};

export default LandingCarousel;