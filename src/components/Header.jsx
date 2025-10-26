import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DarkModeToggle } from './DarkToggle';
import { MapCenterContext } from '../context/MapCenterContext';
import logo from '../assets/CrashCast-TextRed.png';

function Header() {
    const [currentStatIndex, setCurrentStatIndex] = useState(0);
    const [search, setSearch] = useState('');
    const { searchLocation } = useContext(MapCenterContext);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (search.trim()) {
        const found = await searchLocation(search);
        setSearch('');
        if (found){
          console.log('Location found, navigating to /home');
          navigate('/home');
          
        }
      }
    };

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
        <form className="search-bar" onSubmit={handleSubmit}>
          <input type="search" 
          placeholder="Search locations..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">&#128269;</button>
        </form>
        </div>
      </div>
    </header>
  );
}

export default Header;