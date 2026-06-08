import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      
      {/* Logo */}
      <div className="logo-section">
        <div className="logo">P</div>
        <h2>Smart Parking</h2>
      </div>

      {/* Search */}
      <div className="search-box">
        <input type="text" placeholder="Search Parking..." />
        <button className="search-btn">Search</button>
      </div>

      {/* Buttons */}
      <div className="nav-buttons">

        {/* ROUTE */}
        <Link to="/about" className="about-btn">
          About
        </Link>

        {/* Login */}
        <Link to="/login" className="nav-login-btn">
          Login
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;