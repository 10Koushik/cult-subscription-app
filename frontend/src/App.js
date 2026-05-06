import React, { useState } from 'react';
import API from './api';

function App() {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login', {
        userId,
        email,
      });
      localStorage.setItem('token', res.data.access_token);
      console.log("✅ Token:", res.data.access_token);
      setMessage('✅ Login successful');
    } catch (err) {
      console.log(err.response?.data || err.message);
      setMessage('❌ Login failed');
    }
  };

  const handleSubscribe = async () => {
    try {
      const res = await API.post('/subscription/subscribe', {
        userId,
        plan: 'premium',
        amount: 500,
        email,
      });

      console.log("Subscription Response:", res.data);
      setMessage(res.data.message);
      if (res.data.previewUrl) {
        window.open(res.data.previewUrl, '_blank');
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      setMessage('❌ Subscription failed');
    }
  };
  return (
    <div style={{ padding: 20 }}>
      <h2>Cult Subscription App</h2>

      <input
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <br /><br />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />
      <button onClick={handleLogin}>Login</button>
      <br /><br />
      <button onClick={handleSubscribe}>Subscribe</button>
      <h3>{message}</h3>
    </div>
  );
}

export default App;