import React from 'react';
import './App.css'; // Import component-specific styles

// Import components
import Header from './components/Header.jsx';
import MapContainer from './components/MapContainer.jsx';
import Sidebar from './components/Sidebar.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <> {/* Using React fragment shorthand */}
      <Header />
      
      <main className="container main-content">
        <MapContainer />
        <Sidebar />
      </main>

      <Footer />
    </>
  );
}

export default App;