import React from 'react';
import { Link } from 'react-router-dom';
import { DarkModeToggle } from './DarkToggle';
import logo from '../assets/CrashCast-Text.png';

function Header() {
  return (
    <header className="site-header">
      <div className="container header-content">
        <div className="logo">
          {/* CHANGE: Link to root path ("/") */}
          <Link to="/">
            <img src={logo} alt="CrashCast Logo" className="logo-img" />
          </Link>
        </div>
        <nav className="main-nav">
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/help">Help</Link></li>
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