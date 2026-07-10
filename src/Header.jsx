import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import topLeftWave from './assets/homepage/wave-top-left.png';
import leftWave from './assets/homepage/wave-middle-left.png';
import headerLogo from './assets/header/320px90pxwithoutbackground.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <img src={topLeftWave} alt="" title="" className="decorative-wave top-left-wave" />
      <img src={leftWave} alt="" title="" className="decorative-wave left-wave" />

      <Link to="/" className="logo" onClick={closeMenu}><img src={headerLogo} alt="MindWork360 Logo" title="MindWork360 — Mental Health & Healing Community" className="logo-img" /></Link>

      {/* Desktop nav — visible ≥1280px, excludes Resources / Life Lessons / News */}
      <nav className="desktop-nav">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/videolessons">Video Lessons</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/psychotherapy">Psychotherapy Types</Link>
        <Link to="/contactus">Contact Us</Link>
      </nav>

      {/* Hamburger slide-in panel — all items + Privacy + Terms */}
      <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
        <button className="nav-close-btn" onClick={closeMenu} aria-label="Close menu">✕</button>
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
        <Link to="/privacy-policy" onClick={closeMenu}>Privacy Policy</Link>
        <Link to="/terms-of-service" onClick={closeMenu}>Terms of Service</Link>
      </nav>

      {isMenuOpen && <div className="nav-overlay" onClick={closeMenu} />}

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
