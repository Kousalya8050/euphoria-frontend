import React from "react";
import { Link } from "react-router-dom";
import "./Footer_page.css";
import YouTube from './assets/footer/Youtube_final_icon.png';
import Instagram from './assets/footer/Instagram_final_icon.png';
import Facebook from './assets/footer/facebook_final_icon.png';
import Linkedin from './assets/footer/linkedin_finale_icon.png';
import Twitter from './assets/footer/Twitter_final_icon.png';
import Bluesky from './assets/footer/bsky_final_icon.png'
import footerLogo from './assets/320x90(1).png'

import footerWaveImage from './assets/homepage/footer.png';


/* ---- Footer data ---- */
const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Blogs", path: "/blogs" },
  { name: "Video Lessons", path: "/videolessons" },
  { name: "Life Lessons", path: "/lifelessons" },
  { name: "Psychotherapy Types", path: "/psychotherapy" },
  { name: "Resources", path: "/resources" },
  { name: "Contact Us", path: "/contactus" },
  { name: "FAQ", path: "/faq" },
  { name: "News", path: "/rss_feeds" },
];

const socialLinks = [
  { name: "YouTube", icon: YouTube, path: "#" },
  { name: "Instagram", icon: Instagram, path: "#" },
  { name: "Facebook", icon: Facebook, path: "#" },
  { name: "LinkedIn", icon: Linkedin, path: "#" },
  { name: "Twitter", icon: Twitter, path: "#" },
  { name: "Bluesky", icon: Bluesky, path: "#" },
];

const firstColumn = navLinks.slice(0, 6);
const secondColumn = navLinks.slice(6);

const Footer = () => {
  return (
    <footer className="euphoria-footer">
      <div
        className="euphoria-footer-wave-bg"
        style={{ backgroundImage: `url(${footerWaveImage})` }}
      >
        <div className="euphoria-footer-content">

          {/* Logo */}
          <div className="euphoria-footer-logo">
            <Link to="/"><img src={footerLogo} alt="MindWork360 Logo" title="MindWork360 — Mental Health & Healing Community" className="footer-logo-img" />
            </Link>           
            </div>

          {/* Nav + Socials */}
          <div className="euphoria-nav-and-socials-container">

            {/* Nav */}
            <nav className="euphoria-footer-nav">
              <div className="footer-nav-column">
                {firstColumn.map(link => (
                  <Link key={link.name} to={link.path}>{link.name}</Link>
                ))}
              </div>

              <div className="footer-nav-column1">
                {secondColumn.map(link => (
                  <Link key={link.name} to={link.path}>{link.name}</Link>
                ))}
              </div>
            </nav>

            {/* Social Icons (ROW) */}
            <div className="euphoria-footer-socials">
              {socialLinks.map(social => (
                <a
                  key={social.name}
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <img src={social.icon} alt={social.name} title={social.name} style={{ height: "45px", width: "45px" }} />
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
      <div className="footer-legal-bar">
        <span>© {new Date().getFullYear()} MindWork360. All rights reserved.</span>
        <div className="footer-legal-links">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <span className="footer-legal-sep">|</span>
          <Link to="/terms-of-service">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
