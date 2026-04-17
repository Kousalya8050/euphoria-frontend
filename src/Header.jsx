import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import topLeftWave from './assets/homepage/wave-top-left.png';
import leftWave from './assets/homepage/wave-middle-left.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <img src={topLeftWave} alt="" className="decorative-wave top-left-wave" />
      <img src={leftWave} alt="" className="decorative-wave left-wave" />

      <Link to="/" className="logo" onClick={closeMenu}>Euphoria</Link>

      <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/about" onClick={closeMenu}>About Us</Link>
        <Link to="/blogs" onClick={closeMenu}>Blogs</Link>
        <Link to="/videolessons" onClick={closeMenu}>Video Lessons</Link>
        <Link to="/lifelessons" onClick={closeMenu}>Life Lessons</Link>
        <Link to="/faq" onClick={closeMenu}>FAQ</Link>
        <Link to="/psychotherapy" onClick={closeMenu}>Psychotherapy Types</Link>
        <Link to="/resources" onClick={closeMenu}>Resources</Link>
        <Link to="/contactus" onClick={closeMenu}>Contact Us</Link>
        <Link to="/rss_feeds" onClick={closeMenu}>News</Link>
      </nav>

      <button 
        className={`hamburger-menu ${isMenuOpen ? "active" : ""}`} 
        onClick={toggleMenu} 
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
};

export default Header;