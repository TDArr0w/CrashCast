import React from 'react';

function Header() {
  return (
    <header className="site-header">
      <div className="container header-content">
        <div className="logo">
          {/* Vite serves from the 'public' folder as root */}
          <img src="/logo-placeholder.png" alt="CrashCast Logo" className="logo-img" />
          <h1>CrashCast</h1>
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