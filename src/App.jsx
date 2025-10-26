import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { MapCenterProvider } from './context/MapCenterContext';

function App() {
  return (
    <MapCenterProvider>
      <Router>
        <Header />
        <Main />
        <Footer />
      </Router>
    </MapCenterProvider>
  );
}

export default App;