import React, { useState, useEffect } from 'react';
import './LandingPage.css';

const LandingPage = () => {
  const [formData, setFormData] = useState({ fname: '', lname: '', email: '' });
  const [loading, setLoading] = useState(false);
  
  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('success'); // 'success' or 'error'
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    document.title = "Join the Community | Euphoria";
  }, []);

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
      {/* Ticker Bar */}
      <div className="top-community-bar" onClick={scrollToSignup}>
        Join The Euphoria Community — Sign Up for Early Access
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-image-container">
          <img 
            src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1400" 
            alt="Wellness Background" 
            className="hero-bg" 
          />
          <div className="hero-overlay">
            <div className="hero-text-box">
              <h1>The professional network for Mental Health & Wellness.</h1>
              <p>A global digital forum for caregivers, practitioners, and those on a journey to heal and grow.</p>
              <p className="launch-tag">Launching shortly... register to stay updated.</p>
              <button className="btn-primary" onClick={scrollToSignup}>Connect With Us</button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="content-container">
          <h2>About Euphoria Community <span className="green-line"></span></h2>
          <p>
          When I first built Psych2Go in 2008, my vision was to establish a platform for people to communicate, create, and discuss all things psychology, mental health and life. Being the loner in high school, and an introvert, I didn’t know there was a place that allowed friendships, learning and community to develop. Thanks to Tumblr, I was able to post content about psychology, mental health awareness, and other content related to psychology. From there, a small community was formed. You all came to offer answers to questions I had, and even ask more questions on topics I myself was starting to learn about. Those were the best days of Psych2Go, at least for me. Now, we have so many animators, writers, voice actors, and over a thousand videos on Youtube about all things psychology and mental health and everything in between. However, things at Psych2Go is beginning to feel a little too corporate. Too repetitive, too distant from what we used to be.
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