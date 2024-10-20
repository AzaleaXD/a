import React, { useState } from 'react';
import './Login.css'; // Import the CSS file

function Login() {
  const [authKey, setAuthKey] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errors = {};
    if (!authKey) {
      errors.authKey = 'Authentication key is required';
    } else if (authKey.length < 6) {
      errors.authKey = 'Authentication key must be at least 6 characters long';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const response = await fetch('https://your-auth-server.com/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authKey }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage('Login successful!');
      } else {
        setMessage('Invalid authentication key.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Authentication Key:</label>
          <input
            type="text"
            value={authKey}
            onChange={(e) => setAuthKey(e.target.value)}
            required
            className="form-input"
          />
          {errors.authKey && <p className="form-error">{errors.authKey}</p>}
        </div>
        <button type="submit" className="form-button" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
}

export default Login;