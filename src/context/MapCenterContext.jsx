import React, { createContext, useState } from 'react';

export const MapCenterContext = createContext();

export function MapCenterProvider({ children }) {
  const [mapCenter, setMapCenter] = useState({ lat: 47.6061, lng: -122.3328 });
  const [forceRefresh, setForceRefresh] = useState(false);

  const triggerRefresh = () => setForceRefresh(f => !f);

  // Shared search handler
  const searchLocation = async (query) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
    const results = await response.json();
    if (results[0]) {
      setMapCenter({
        lat: parseFloat(results[0].lat),
        lng: parseFloat(results[0].lon),
      });
      triggerRefresh();
      return true;
    }
    return false;
  };

  return (
    <MapCenterContext.Provider value={{ mapCenter, setMapCenter, searchLocation, forceRefresh, triggerRefresh }}>
      {children}
    </MapCenterContext.Provider>
  );
}