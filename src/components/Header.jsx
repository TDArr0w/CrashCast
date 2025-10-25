import React from 'react';
import { DarkModeToggle } from './DarkToggle';
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
            <li><a href="/">Home</a></li>
            <li><a href="#">About</a></li>
            
            <li><a href="help">Help</a></li>


          </ul>
        </nav>
        <div className='toggle-n-search'>
          <DarkModeToggle/>
        <form className="search-bar">
          <input type="search" placeholder="Search locations..." />
          <button type="submit">&#128269;</button>
        </form>
        </div>
      </div>
    </header>
  );
}

export default Header;