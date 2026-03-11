import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './ResourcesSection.css';
import Footer from "./Footer_page";
import neverGiveUp from './assets/resources/never-give-up.png';
import learnToRest from './assets/resources/learn-to-rest.png';
import whenLifeGetsBlurry from './assets/resources/when-life-blurry.png';
import successRevenge from './assets/resources/success-revenge.png';
import contactIllustration from './assets/resources/contact2.jpg';


const ResourcesSection = () => {
  const [popup, setPopup] = useState({
      show: false,
      type: "", // "success" | "error"
      message: ""
    });
   
      const images = [
        { src: neverGiveUp, text: "Never Give Up" },
        { src: learnToRest, text: "Learn to Rest" },
        { src: whenLifeGetsBlurry, text: "When Life Gets Blurry" },
        { src: successRevenge, text: "Success is the Best Revenge" },
      ];

      const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      const index = Math.round(container.scrollLeft / container.offsetWidth);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll);

    // ✅ Auto-scroll logic
    const autoScroll = setInterval(() => {
      if (!container) return;
      const nextIndex = (activeIndex + 1) % images.length;
      container.scrollTo({
        left: nextIndex * container.offsetWidth,
        behavior: "smooth",
      });
      setActiveIndex(nextIndex);
    }, 3000); // scroll every 3 seconds
    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearInterval(autoScroll);
    };
  }, [activeIndex, images.length]);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://euphoria-backend-oii0.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name.trim()) {
      setPopup({
        show: true,
        type: "error",
        message: "Name is required"
      });
      return;
    }
  
    if (!email.trim()) {
      setPopup({
        show: true,
        type: "error",
        message: "Email is required"
      });
      return;
    }
  
   
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setPopup({
        show: true,
        type: "error",
        message: "Please enter a valid email address"
      });
      return;
    }
  
    try {
      const res = await axios.post(`${API_URL}/api/newsletter/subscribe`, {
        name,
        email,
      });
  
      
      setPopup({
        show: true,
        type: "success",
        message: res.data.message || "Subscribed successfully!"
      });
  
      
      setName("");
      setEmail("");
  
    } catch (error) {
      
      setPopup({
        show: true,
        type: "error",
        message: error.response?.data?.message || "Something went wrong. Please try again."
      });
    }
  };
  const navigate = useNavigate();



  useEffect(() => {
    if (popup.show) {
      const timer = setTimeout(() => {
        setPopup({ show: false, type: "", message: "" });
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, [popup.show]);
    return (
      <div className="resources-container">
        <h2 className="resources-heading">RESOURCES</h2>
  
        {/* <div className="images-layout">
         
          <div className="img-box never-give-up">
            <div className="bg-square green-bg"></div>
            <img src={neverGiveUp} alt="Never Give Up" />
          </div>
  
          <div className="img-box learn-to-rest">
            <div className="bg-square lightgreen-bg"></div>
            <img src={learnToRest} alt="Learn to Rest" />
          </div>
  
          
          <div className="img-box blurry-focus">
            <div className="bg-square darkgreen-bg"></div>
            <img src={whenLifeGetsBlurry} alt="Blurry Focus" />
          </div>
  
          
          <div className="img-box success-revenge">
            <div className="bg-square lime-bg"></div>
            <img src={successRevenge} alt="Success is the Best Revenge" />
          </div>
        </div> */}
        {/* ✅ Desktop Grid Layout */}
      <div className="images-layout desktop-only_r">
        <div className="img-box never-give-up">
          <div className="bg-square green-bg"></div>
          <img src={neverGiveUp} alt="Never Give Up" />
        </div>

        <div className="img-box learn-to-rest">
          <div className="bg-square lightgreen-bg"></div>
          <img src={learnToRest} alt="Learn to Rest" />
        </div>

        <div className="img-box blurry-focus">
          <div className="bg-square darkgreen-bg"></div>
          <img src={whenLifeGetsBlurry} alt="When Life Gets Blurry" />
        </div>

        <div className="img-box success-revenge">
          <div className="bg-square lime-bg"></div>
          <img src={successRevenge} alt="Success is the Best Revenge" />
        </div>
      </div>

      {/* ✅ Mobile/Tablet Carousel */}
      <div className="mobile-carousel_r">
        <div className="mobile-carousel-container_r" ref={containerRef}>
          {images.map((img, index) => (
            <div className="mobile-carousel-slide_r" key={index}>
              <img
                src={img.src}
                alt={`Slide ${index + 1}`}
                className="mobile-carousel-image_r"
              />
              {/* <div className="mobile-carousel-text">{img.text}</div> */}
            </div>
          ))}
        </div>

        <div className="mobile-carousel-dots_r">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === activeIndex ? "active" : ""}`}
            />
          ))}
        </div>
      </div>

        {/* Newsletter Section */}
        <div className="newsletter-section_r">
        <div className="newsletter-left_r">
            <h3>Ideas to Help You Learn, Heal and Grow</h3>
            <p>
            Get weekly insights for better relationships, deeper self-knowledge, and inner calm.
            Sign up for inspiration, plus 10% off your first shop order.
            By signing up, you agree to receive email marketing material from The School of Life.
            You can unsubscribe at any time. For more details, please refer to our Privacy Policy.
            </p>
        </div>
        <div className="newsletter-form_r">
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />

        <label>Email</label>
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <button type="submit">Submit</button>
      </form>
    </div>
        </div>
        {popup.show && (
          <div
            className="popup-overlay"
            onClick={() => setPopup({ show: false, type: "", message: "" })}
          >
            <div
              className={`popup ${popup.type}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="icon-wrapper">
                {popup.type === "success" ? (
                  <svg className="success-icon" viewBox="0 0 52 52">
                    <circle className="success-circle" cx="26" cy="26" r="25" />
                    <path className="success-check" d="M14 27l7 7 17-17" />
                  </svg>
                ) : (
                  <svg className="error-icon" viewBox="0 0 52 52">
                    <circle className="error-circle" cx="26" cy="26" r="25" />
                    <path className="error-cross" d="M16 16 36 36 M36 16 16 36" />
                  </svg>
                )}
              </div>

              <p className="popup-message">{popup.message}</p>
            </div>
          </div>
        )}



        <div className="contact-section_r">
        <div className="contact-left_r">
          <h4 className="contact-title">CONTACT</h4>
          <h3>No matter the challenge, we're by your side in more ways than one</h3>
          <p>
            We’re committed to helping people find fulfilment all over the world. As well as a complete online affiliate store,
            we also have international schools & flagship stores (see below). Each of these branches of The School of Life offer
            people and businesses around the world the chance to find fulfilment in person.
          </p>
          <p className="contact-note">
            <strong>Struggling with depression? You’re not alone.</strong><br />
            <span className="green-link">Browse our directory and connect with a therapist who’s right for you.</span>
          </p>
          <button className="connect-button" onClick={() => navigate("/contactus")} >Connect with Us</button>
        </div>
        <div className="contact-right_r">
          <img src={contactIllustration} alt="Contact Illustration" />
        </div>
      </div>

        {/* --- FOOTER SECTION --- */}
                    {/* <footer className="euphoria-footer">
                    <div
                      className="euphoria-footer-wave-bg"
                      style={{ backgroundImage: `url(${footerWaveImage})` }}
                    >
                      <div className="euphoria-footer-content">
                        <div className="euphoria-footer-logo">
                          Euphoria
                        </div>
              
                        <div className="euphoria-nav-and-socials-container">
                          <nav className="euphoria-footer-nav">
                            {navLinks.map((link) => (
                              <a
                                key={link.name}
                                href={link.path}
                                style={{ marginLeft: link.marginLeft }}
                              >
                                {link.name}
                              </a>
                            ))}
                          </nav>
              
                          <div className="euphoria-footer-socials">
                            {socialLinks.map((social) => (
                              <a key={social.name} href={social.path} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                                <img src={social.icon} alt={social.name} />
                              </a>
                            ))}
                          </div>
                          </div>
                      </div>
                    </div>
                   
                  </footer> */}
                  <Footer />


      </div>
    );
  };
  
  export default ResourcesSection;
