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
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBouncing((prev) => !prev);
    }, 1000); // Toggle every 1 second

    return () => clearInterval(interval);
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
        className={`ambulance-body ${isBouncing ? "bounce" : ""}`}
        style={{ position: "absolute", top: 0, left: 0 }}
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