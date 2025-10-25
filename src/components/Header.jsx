import React from 'react';
import logo from '../assets/CrashCast-Text.png';

function Header() {
  return (
    <header className="site-header">
      <div className="container header-content">
        <div className="logo">
          <img src={logo} alt="CrashCast Logo" className="logo-img" />
        </div>
        <nav className="main-nav">
          <ul>
            <li><a href="#" className="active">Home</a></li>
            <li><a href="#">About</a></li>
            
            <li><a href="#">Help</a></li>

          </ul>
        </nav>
        <form className="search-bar">
          <input type="search" placeholder="Search locations..." />
          <button type="submit">&#128269;</button>
        </form>
      </div>
    </header>
  );
}

export default Header;