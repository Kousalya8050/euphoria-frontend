import React, { useState, useEffect } from 'react';
import 'react-phone-input-2/lib/style.css';
import axios from "axios";
import PhoneInput from 'react-phone-input-2';
import { Link } from 'react-router-dom';
import './SignupPage.css'; 
import Footer from "./Footer_page";
import catpcha  from './assets/contactus/recaptcha-logo.jpeg';

const ContactUs = () => {
  const [popup, setPopup] = useState({
    show: false,
    type: "", // "success" | "error"
    message: ""
  });


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [file, setFile] = useState(null);

  // Handle Text Inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle File Input
  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName.trim()) {
      alert("First Name is required");
      return;
    }
    if (!formData.lastName.trim()) {
      alert("Last Name is required");
      return;
    }
    if (!formData.email.trim()) {
      alert("Email is required");
      return;
    }
    // Basic email regex check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      alert("Please enter a valid email");
      return;
    }
  
    if (!formData.phone.trim()) {
      alert("Phone Number is required");
      return;
    }
    
    // you can adjust the length if needed
    if (formData.phone.length < 5) {
      alert("Please enter a valid Phone Number");
      return;
    }

    if (!formData.message.trim()) {
      alert("Message is required");
      return;
    }
    if (!isCaptchaChecked) {
      alert("Please verify you are not a robot");
      return;
    }
    try {
      const formDataToSend = new FormData();
  
      // ---- 📌 FIX STARTS HERE ----
      let countryCode = formData.countryCode;        // e.g. "+91"
      let fullPhone = formData.phone;                // e.g. "918989898989"
  
      // Remove + from country code for matching
      let ccWithoutPlus = countryCode.replace("+", "");
  
      // Remove country code from phone number
      let phoneWithoutCode = fullPhone.startsWith(ccWithoutPlus)
        ? fullPhone.slice(ccWithoutPlus.length)
        : fullPhone;
  
      // Remove any extra leading '+' (safety)
      phoneWithoutCode = phoneWithoutCode.replace(/^\+/, "");
      // ---- 📌 FIX ENDS HERE ----
  
      // Backend expects these exact names
      formDataToSend.append("first_name", formData.firstName);
      formDataToSend.append("last_name", formData.lastName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("country_code", countryCode);
      formDataToSend.append("phone", phoneWithoutCode); 
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("message", formData.message);
  
      if (file) {
        formDataToSend.append("file", file);
      }
  
      const API_URL = "https://euphoria-backend-oii0.onrender.com";

      const response = await axios.post(
        `${API_URL}/api/contact-us`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
  
      // alert(response.data.message);
      setPopup({
        show: true,
        type: "success",
        message: response.data.message || "Message sent successfully!"
      });

       //RESET FORM AFTER SUCCESS
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          countryCode: "",
          phone: "",
          subject: "",
          message: ""
        });

        setFile(null);            
        setIsCaptchaChecked(false); 
        setFormStatus("");  
  
    } catch (error) {
      // alert(error.response?.data?.message || "Something went wrong");
      setPopup({
        show: true,
        type: "error",
        message: error.response?.data?.message || "Something went wrong"
      });
    }
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

// Code for captcha
const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);
const [isSubmitting] = useState(false);
const [formStatus, setFormStatus] = useState("");
useEffect(() => {
  if (popup.show) {
    const timer = setTimeout(() => {
      setPopup({ show: false, type: "", message: "" });
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [popup.show]);

  return (
    <>
      {/* Header (no changes here) */}
      <header className="header">
        <Link to="/" className="logo" onClick={closeMenu}>Euphoria</Link>
        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/about" onClick={closeMenu}>About Us</Link>
          {/* <Link to="#" onClick={closeMenu}>Academic</Link>
          <Link to="#" onClick={closeMenu}>Casual</Link> */}
          <Link to="/blog" onClick={closeMenu}>Blog</Link>
          <Link to="/videolessons" onClick={closeMenu}>Video Lessons</Link>
          <Link to="/lifelessons" onClick={closeMenu}>Life Lessons</Link>
          <Link to="/faq" onClick={closeMenu}>FAQ</Link>
          <Link to="/psychotherapy" onClick={closeMenu}>Psychotherapy Types</Link>
          <Link to="/resources" onClick={closeMenu}>Resources</Link>
          <Link to="/contactus" onClick={closeMenu}>Contact Us</Link>
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

      {/* ✅ Contact Form Section - ORIGINAL JSX STRUCTURE (NO CHANGES) */}
      <h2 className="contact-container1">Contact Us</h2>
      <div className="contact-container">
        {/* contact-left (contains both help and locations for desktop) */}
        <div className="contact-left">
          <div className="help-section">
            <h2>How can we help?</h2>
            <p>
              Let's talk about you and your product vision. Everything we do is customized for your specific needs.
              We look forward to connecting with you to discuss how PROFLOCA can help you make your vision a reality!
              Email us to schedule a consult. We will respond to you as soon as we can.
            </p>
          </div>

          <div className="location-section">
            <h3>Locations</h3>
            <div className="locations-grid">
              {[...Array(4)].map((_, i) => (
                <div className="location-box" key={i}>
                  <p><strong>Singapore</strong></p>
                  <p>1 Raffles Pl</p>
                  <p>Tower 2, Level 19</p>
                  <p>Singapore 048616</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* contact-right (the form) */}
        <div className="contact-right">
        <form onSubmit={handleSubmit}>
  <div className="form-group name-row">
    <div className="signin-input-box">
      <label className="signin-label">First Name</label>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
        required
        className="contactus-input"
      />
    </div>

    <div className="signin-input-box">
      <label className="signin-label">Last Name</label>
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        required
        className="contactus-input"
      />
    </div>
  </div>

  <div className="signin-input-box">
    <label className="signin-label">Email</label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Email"
      required
      className="contactus-input"
    />
  </div>

  <div className="signin-input-box">
    <label className="signin-label">Phone Number</label>
    <PhoneInput
  country={'sg'}
  value={formData.phone}
  onChange={(value, countryData, e, formattedValue) => {

    const dialCode = countryData.dialCode;
  
    // Remove +<dial> from the beginning ONLY
    let nationalNumber = value.startsWith(`+${dialCode}`)
      ? value.slice(dialCode.length + 1)
      : value;
  
    // Remove spaces, hyphens if present
    nationalNumber = nationalNumber.replace(/\D/g, "");
  
    setFormData({
      ...formData,
      countryCode: `+${dialCode}`,
      phone: nationalNumber
    });
  }}
  placeholder="Phone Number"
  inputClass="phone-input"
  containerClass="phone-container"
/>
  </div>

  <div className="signin-input-box">
    <label className="signin-label">Subject</label>
    <input
      type="text"
      name="subject"
      value={formData.subject}
      onChange={handleChange}
      placeholder="Subject"
      className="contactus-input"
    />
  </div>

  <div className="signin-input-box">
    <label className="signin-label">Your Message</label>
    <textarea
      name="message"
      value={formData.message}
      onChange={handleChange}
      placeholder="Your Message"
      rows="5"
      required
      className="contactus-input"
    ></textarea>
  </div>

  {/* Optional file upload */}
  {/* <input
    type="file"
    name="file"
    onChange={handleFileChange}
    style={{ marginBottom: "15px" }}
  /> */}
  <div
  className="recaptcha-wrapper"
  onClick={() => setIsCaptchaChecked(!isCaptchaChecked)}
>
  <div className="recaptcha-left">
    <div className={`recaptcha-box ${isCaptchaChecked ? 'checked' : ''}`}>
      {isCaptchaChecked && (
        <svg className="check-icon" viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      )}
    </div>
    <span className="recaptcha-label">I'm not a robot</span>
  </div>

  <div className="recaptcha-right">
    <img src={catpcha} alt="captcha" className="recaptcha-image" />
    <div className="recaptcha-logo">reCAPTCHA</div>
    <div className="recaptcha-terms">Privacy - Terms</div>
  </div>
</div>
<button className="signin-button" type="submit" disabled={isSubmitting}>
  {isSubmitting ? "SENDING..." : "SUBMIT"}
</button>
{formStatus && (
  <p className={`form-status ${formStatus.includes("verify") ? "error" : ""}`}>
    {formStatus}
  </p>
)}

  {/* <button className="signin-button" type="submit">SUBMIT</button> */}
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

<Footer />
    </>
  );
};

export default ContactUs;