import React, { createContext, useState } from 'react';

export const MapCenterContext = createContext();

export function MapCenterProvider({ children }) {
  const [mapCenter, setMapCenter] = useState({ lat: 47.6061, lng: -122.4194 });

  return (
    <MapCenterContext.Provider value={{ mapCenter, setMapCenter }}>
      {children}
    </MapCenterContext.Provider>
  );
}