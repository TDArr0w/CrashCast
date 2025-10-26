import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import MapContainer from '../components/MapContainer';
import Sidebar from '../components/Sidebar';
import { MapCenterContext } from '../context/MapCenterContext';

function Home() {
  const { setMapCenter } = useContext(MapCenterContext);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const region = params.get('region');
    if (!region) return;

    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(region)}`
        );
        const results = await response.json();
        if (results[0]) {
          setMapCenter({
            lat: parseFloat(results[0].lat),
            lng: parseFloat(results[0].lon),
          });
        } else {
          console.warn('No results found for region:', region);
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchCoordinates();
  }, [location.search, setMapCenter]);

  return (
    <>
      <MapContainer />
      <Sidebar />
    </>
  );
}

export default Home;
