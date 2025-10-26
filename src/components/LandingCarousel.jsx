import React from 'react';
import '../styles/LandingCarousel.css';


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
  const roadStyle = {
    '--size': `${size}px`,
    '--rotation-speed': `${rotationSpeed}s`,
    '--road-thickness': `${roadThickness}px`,
    '--stripe-width': `${stripeWidth}px`,
    '--dash-deg': `${dashLengthDeg}deg`,
    '--gap-deg': `${gapLengthDeg}deg`,
  };

  return (
    <div className="landing-carousel-container" style={{ height: `${arcHeight}px` }}>
      <div
        className="landing-carousel"
        style={{
          transform: `translateY(${arcOffset * 100}%)`,
        }}
      >
        <div className="road-base" style={roadStyle}></div>
        <div className="road-stripe" style={roadStyle}></div>
      </div>
    </div>
  );
};

export default LandingCarousel;