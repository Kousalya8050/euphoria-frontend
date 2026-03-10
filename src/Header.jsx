import React, { useState } from 'react'; // 1. Import useState
import { Link } from 'react-router-dom';
import './Header.css';

// Your image imports (assuming they are in the correct location)
import topLeftWave from './assets/homepage/wave-top-left.png';
import leftWave from './assets/homepage/wave-middle-left.png';

const Header = () => {
  // State to manage if the mobile menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Helper to close the menu when a link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <header className="header">
      {/* Decorative waves are hidden by CSS on smaller screens */}
      <img src={topLeftWave} alt="Decorative wave" className="decorative-wave top-left-wave" />
      <img src={leftWave} alt="Decorative wave" className="decorative-wave left-wave" />

      <Link to="/" className="logo" onClick={closeMenu}>Euphoria</Link>

      {/* 4. The navigation menu now gets a dynamic class */}
      <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/about" onClick={closeMenu}>About Us</Link>
        {/* <Link to="#" onClick={closeMenu}>Academic</Link>
        <Link to="#" onClick={closeMenu}>Casual</Link> */}
        <Link to="/blogs" onClick={closeMenu}>Blogs</Link>
        <Link to="/videolessons" onClick={closeMenu}>Video Lessons</Link>
        <Link to="/lifelessons" onClick={closeMenu}>Life Lessons</Link>
        <Link to="/faq" onClick={closeMenu}>FAQ</Link>
        <Link to="/psychotherapy" onClick={closeMenu}>Psychotherapy Types</Link>
        <Link to="/resources" onClick={closeMenu}>Resources</Link>
        <Link to="/contactus" onClick={closeMenu}>Contact Us</Link>
      </nav>

      {/* 5. This is the new hamburger menu button */}
      <button className={`hamburger-menu ${isMenuOpen ? "active" : ""}`}  onClick={toggleMenu} aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
};

export default Header;