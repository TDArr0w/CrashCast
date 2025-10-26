import React, { useState, useEffect } from "react";
import WheelsFront from "../assets/ambulance_wheels_front.png";
import WheelsRear from "../assets/ambulance_wheels_rear.png";
import AmbulanceBody from "../assets/ambulance_body.png";
import Headlights from "../assets/ambulance_headlights.png";
import LandingCarousel from "./LandingCarousel";

/*====STRUCTURE=====*/
// Wheels rear
// Ambulance body (updated to bounce up and down)
// Wheels front. pretty simple
function LandingAmbulance() {
  const [yOffset, setYOffset] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    let start = null;
    const amplitude = 5; // pixels of bounce height
    const speed = 0.005; // controls bounce speed
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      setYOffset(Math.sin(progress * speed) * amplitude);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.body.classList.contains('dark'));
    };
    
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="ambulance-container"
      style={{
        position: "relative",
        width: "50px",
        position: "absolute",
        width: "50px", 
        height: "50px",
        overflow: "visible",
        left: "-12%",
        top: "-20%",
        transform: "scale(0.5)",
        left: "50%",
        top: "50%",
        transform: "translate(-420%, -420%) scale(0.5)",
        transformOrigin: "center",
        zIndex: 3 // <-- ADD THIS LINE to ensure it's on top
      }}
    >
      <img
        src={WheelsRear}
        alt="Wheels Rear"
        className="wheels-rear"
        style={{ position: "absolute", top: 0, left: 0 }}
      />
      <img
        src={AmbulanceBody}
        alt="Ambulance Body"
        className="ambulance-body"
        style={{ position: "absolute", top: `${yOffset}px`, left: 0 }}
      />
      <img
        src={Headlights}
        alt="Headlights"
        className="headlights"
        style={{ 
          position: "absolute", 
          top: `${yOffset}px`, 
          left: 0,
          opacity: isDarkMode ? 1 : 0,
          transition: "opacity 0.5s ease"
        }}
      />
      <img
        src={WheelsFront}
        alt="Wheels Front"
        className="wheels-front"
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
}

export default LandingAmbulance;