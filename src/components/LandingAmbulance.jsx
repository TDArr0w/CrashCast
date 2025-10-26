import React, { useState, useEffect } from "react";
import WheelsFront from "../assets/ambulance_wheels_front.png";
import WheelsRear from "../assets/ambulance_wheels_rear.png";
import AmbulanceBody from "../assets/ambulance_body.png";
import LandingCarousel from "./LandingCarousel";

/*====STRUCTURE=====*/
// Wheels rear
// Ambulance body (updated to bounce up and down)
// Wheels front. pretty simple
function LandingAmbulance() {
  const [yOffset, setYOffset] = useState(0);

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
        transform: "translate(-400%, -420%) scale(0.5)",
        transformOrigin: "center"
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
        src={WheelsFront}
        alt="Wheels Front"
        className="wheels-front"
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
}

export default LandingAmbulance;