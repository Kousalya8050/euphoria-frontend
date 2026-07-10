import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './LandingPage.css';
import banner from './assets/homepage/banner_for_landing.jpg';
import logo from './assets/header/320px90pxwithoutbackground.png';
const LandingPage = () => {
  const [formData, setFormData] = useState({ fname: '', lname: '', email: '' });
  const [loading, setLoading] = useState(false);
  
  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('success'); // 'success' or 'error'
  const [modalMessage, setModalMessage] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      formData.fname.trim().length > 0 &&
      formData.lname.trim().length > 0 &&
      emailRegex.test(formData.email)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setLoading(true);

    const API_URL = window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://euphoria-backend-oii0.onrender.com";

    try {
      const response = await fetch(`${API_URL}/api/landing/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setModalType('success');
        setModalMessage("Thanks for your interest! We will be in touch soon.");
        setFormData({ fname: '', lname: '', email: '' }); // Clear form
      } else {
        setModalType('error');
        setModalMessage(data.message || "This email might already be registered.");
      }
    } catch (err) {
      setModalType('error');
      setModalMessage("Unable to connect to the server. Please try again later.");
    } finally {
      setLoading(false);
      setShowModal(true);
    }
  };

  const scrollToSignup = () => {
    document.getElementById('signup-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="euphoria-landing">
      <Helmet>
        <title>Join the Community | MindWork360</title>
        <meta name="description" content="Join MindWork360 — a supportive mental health and healing community. Sign up for early access and connect with others on your journey to well-being." />
      </Helmet>
      {/* Ticker Bar */}
      <div className="top-community-bar" onClick={scrollToSignup}>
        Join The Euphoria Community — Sign Up for Early Access
      </div>

      {/* Hero Section */}
      <section className="hero-section">
  <div className="hero-image-container">
    <img
      src={banner}
      alt="MindWork360 Banner"
      title="MindWork360 — Mental Health & Healing Community"
      className="hero-bg"
    />

    <div className="hero-overlay">
      <div className="hero-text-box">
        
        {/* Logo */}
        <img
          src={logo}
          alt="MindWork360 Logo"
          title="MindWork360"
          className="hero-logo"
        />

        {/* <h1>MindWork360</h1> */}

        <p>
          A Mental Health and Healing Community for Those Looking to Heal, Learn and Improve Their Lives.
        </p>

        <p>
          We Want you to Live Your Best Life.
        </p>

        <p>
          Share with Someone Who You Think May Benefit From Our Work.
        </p>

        <p className="launch-tag">
          Launching Shortly….Register to Stay Updated.
        </p>

        <button 
          className="btn-primary" 
          onClick={scrollToSignup}
        >
          Connect With Us
        </button>
      </div>
    </div>
  </div>
</section>

      {/* About Section */}
      <section className="about-section">
        <div className="content-container">
          <h2>About the MindWork360 Community <span className="green-line"></span></h2>
          <p>
          Welcome to MindWork360—a supportive community for mental health, personal growth, and stronger relationships. Whether you’re navigating stress, anxiety, burnout, life transitions, or simply working to improve how you feel and function, you’re welcome here.          
          </p>
          <p>
          Inside MindWork360, you’ll find member forums for open discussion, blogs with practical insights, research papers to deepen understanding, and curated links to trusted resources. Over time, we also plan to add access to therapists who may be able to help with mental health concerns, psychotherapy, and improving human performance and relationships.          
          </p>
          <p>
          MindWork360 is a community and educational space and does not provide medical advice, diagnosis, or emergency services. If you’re in immediate danger or thinking about harming yourself, please contact your local emergency number right now or reach out to a crisis hotline in your country.          
          </p>

        </div>
      </section>

      <hr className="section-divider" />

      {/* Signup Section */}
      <section id="signup-section" className="signup-section">
        <div className="content-container">
          <h3>Register To Stay In Touch</h3>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name <span className="required">*</span></label>
              <div className="name-row">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  name="fname" 
                  value={formData.fname} 
                  onChange={handleChange} 
                  required 
                />
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  name="lname" 
                  value={formData.lname} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email ID <span className="required">*</span></label>
              <input 
                type="email" 
                placeholder="email@example.com" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>

            <button 
              type="submit" 
              className={`submit-btn ${isFormValid() && !loading ? 'active' : 'disabled'}`}
              disabled={!isFormValid() || loading}
            >
              {loading ? "Processing..." : "Register Now"}
            </button>
          </form>
        </div>
      </section>
      <hr className="section-divider" />

      {/* Dynamic Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className={`modal-icon ${modalType}`}>
              {modalType === 'success' ? '✓' : '!'}
            </div>
            <h2>{modalType === 'success' ? 'Success!' : 'Oops!'}</h2>
            <p>{modalMessage}</p>
            <button className="btn-close" onClick={() => setShowModal(false)}>
              {modalType === 'success' ? 'Okay' : 'Try Again'}
            </button>
          </div>
        </div>
      )}

      {/* <Footer /> */}
    </div>
  );
};

export default LandingPage;