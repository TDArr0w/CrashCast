// context/MapCenterContext.jsx
import React, { createContext, useState } from 'react';

export const MapCenterContext = createContext();

export const MapCenterProvider = ({ children }) => {
  const [mapCenter, setMapCenter] = useState({ 
    lat: 47.6061, 
    lng: -122.3328 // Default to Seattle
  });

  return (
    <MapCenterContext.Provider value={{ mapCenter, setMapCenter }}>
      {children}
    </MapCenterContext.Provider>
  );
};