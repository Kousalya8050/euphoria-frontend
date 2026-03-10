import React from "react";
import { Link } from "react-router-dom";
import "./Footer_page.css";
import Instagram from './assets/footer/instawhi.webp';
import Facebook from './assets/footer/fbwhi.webp';
import Linkedin from './assets/footer/linkewhi.webp';
import Twitter from './assets/footer/twiwhi.webp';
import Bluesky from './assets/footer/bluesky.png'

import footerWaveImage from './assets/homepage/footer.png';
import rightWave from './assets/homepage/wave-middle-right.png';

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
];

const socialLinks = [
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
          <div className="euphoria-footer-logo">Euphoria</div>

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
                  <img src={social.icon} alt={social.name} />
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
