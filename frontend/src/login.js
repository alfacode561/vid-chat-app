import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (!captchaValue) {
      setError('Please complete the CAPTCHA');
      return;
    }
    // Implement login logic here
    console.log('Login attempt', { identifier, password, rememberMe });
    // Reset error state if login is successful
    setError('');
  };

  const handleSocialLogin = (platform) => {
    // Implement social login logic here
    console.log(`${platform} login attempt`);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Implement dark mode logic here (e.g., updating CSS classes)
  };

  return (
    <div className={`login-container ${darkMode ? 'dark-mode' : ''}`}>
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login to Vid-Chat-App</h2>
        
        <div className="input-group">
          <label htmlFor="identifier">Username/Email/Phone</label>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Enter your username, email, or phone"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="rememberMe">Remember me</label>
        </div>

        <ReCAPTCHA
          sitekey="YOUR_RECAPTCHA_SITE_KEY"
          onChange={(value) => setCaptchaValue(value)}
        />

        <button type="submit" className="login-button">Log In</button>

        {error && <p className="error-message">{error}</p>}

        <div className="links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/signup">Sign Up</Link>
        </div>

        <div className="social-login">
          <button type="button" onClick={() => handleSocialLogin('Google')}><FaGoogle /> Google</button>
          <button type="button" onClick={() => handleSocialLogin('Facebook')}><FaFacebook /> Facebook</button>
          <button type="button" onClick={() => handleSocialLogin('GitHub')}><FaGithub /> GitHub</button>
        </div>

        <button type="button" onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </form>
    </div>
  );
};

export default Login;
