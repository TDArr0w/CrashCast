import React, { useState, useEffect } from "react";
import WheelsFront from "../assets/ambulance_wheels_front_50.png";
import WheelsRear from "../assets/ambulance_wheels_rear_50.png";
import AmbulanceBody from "../assets/ambulance_body_50.png";

/*====STRUCTURE=====*/
// Wheels rear
// Ambulance body (updated to bounce up and down)
// Wheels front. pretty simple
function AmbulanceAnimation() {
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBouncing((prev) => !prev);
    }, 1000); // Toggle every 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ambulance-container">
      <img src={WheelsRear} alt="Wheels Rear" className="wheels-rear" />
      <img
        src={AmbulanceBody}
        alt="Ambulance Body"
        className={`ambulance-body ${isBouncing ? "bounce" : ""}`}
      />
      <img src={WheelsFront} alt="Wheels Front" className="wheels-front" />
    </div>
  );
}