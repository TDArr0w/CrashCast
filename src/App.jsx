// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header.jsx';
import MapContainer from './components/MapContainer.jsx';
import Sidebar from './components/Sidebar.jsx';
import Footer from './components/Footer.jsx';
import Help from './components/Help.jsx';

function App() {
  return (
    <Router>
      <Header />
      
      <main className="container main-content">
        <Routes>
          {/* Home page route - loads by default */}
          <Route path="/" element={
            <>
              <MapContainer />
              <Sidebar />
            </>
          } />
          
          {/* Help page route */}
          <Route path="/help" element={<Help />} />
        </Routes>
      </main>
      
      <Footer />
    </Router>
  );
}

export default App;