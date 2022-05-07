import React from "react";

import "./Navbar.css";

const Navbar = () => {
  return (
    <header>
      <nav>
        <a className="logo-link" href="/">
          <img src="/logo.png" alt="Properties" />
        </a>

        <div className="nav-links-container">
          <a href="/properties" className="nav-link">
            Properties/Rentals
          </a>
          <a href="/services" className="nav-link">
            Services
          </a>
          <a href="/roommate-finder" className="nav-link">
            Roommate finder
          </a>
        </div>

        <div className="nav-buttons-container">
          <a href="/login" className="nav-button">
            Log In
          </a>
          <a href="/signup" className="nav-button">
            Sign Up
          </a>
        </div>
      </nav>
    </header>
  )
};

export default Navbar;
