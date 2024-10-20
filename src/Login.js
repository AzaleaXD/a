// App.js
import React from 'react';
import Login from './Login';

function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;

// Login.js
import React, { useState } from 'react';

function Login() {
  const [authKey, setAuthKey] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Authentication Key:</label>
          <input
            type="text"
            value={authKey}
            onChange={(e) => setAuthKey(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export { Login };