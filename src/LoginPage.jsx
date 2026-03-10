// LoginPage.jsx

import React, { useState, useEffect } from 'react'; // 1. Import useState
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // 2. Import the eye icons
import './LoginPage.css';
import rightWave from './assets/homepage/wave-middle-right.png';

const LoginPage = () => {
    
        useEffect(() => {
          document.body.classList.add('no-scroll');
          return () => {
            document.body.classList.remove('no-scroll');
          };
        }, []);
  // 3. Set up state to track password visibility
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  // 4. Create a function to toggle the state
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="login-page-container">
        <img src={rightWave} alt="Decorative middle left wave" className="decorative-wave-l left-waves-l" />
        <img src={rightWave} alt="Decorative middle right wave" className="decorative-wave-l right-wave-l" />
      <div className="login-form-wrapper">
        <h2>Log in</h2>

        <button className="social-btn google-btn">Continue with Google</button>
        <button className="social-btn apple-btn">Continue with Apple</button>

        <div className="or-separator">
          <span>OR</span>
        </div>

        <form>
          <div className="login-form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" />
          </div>

          <div className="login-form-group">
            <label htmlFor="password">Your password</label>
            <div className="password-wrapper">
              {/* 5. Set the input type based on state */}
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
              />
              {/* 6. Add the icon with an onClick handler */}
              <span className="toggle-password" onClick={togglePasswordVisibility}>
                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="form-options">
            <div className="keep-signed-in">
              <input type="checkbox" id="keep-signed-in" />
              <label htmlFor="keep-signed-in">Keep me signed in until I sign out.</label>
            </div>
            <Link to="/forgot-password" className="forgot-password-link">Forget your password</Link>
          </div>

          <button type="submit" className="login-btn">Log In</button>
        </form>

        <div className="signup-link">
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;