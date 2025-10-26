import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { MapCenterProvider } from './context/MapCenterContext';

function App() {
  const [mapCenter, setMapCenter] = useState({ lat: 47.6061, lng: -122.3328 }); // Default to Seattle

  const handleSearch = async (query) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
    const results = await response.json();
    if (results[0]) {
      setMapCenter({
        lat: parseFloat(results[0].lat),
        lng: parseFloat(results[0].lon),
      });
    }
  };

  return (
    <MapCenterProvider>
      <Router>
        <Header onSearch={handleSearch} />
        <Main mapCenter={mapCenter} />
        <Footer />
      </Router>
    </MapCenterProvider>
  );
}

export default App;