import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Help from '../pages/Help';
import Landing from '../pages/Landing';

function Main() {
  return (
    <main className="container main-content">
      <Routes>
      <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </main>
  );
}

export default Main;