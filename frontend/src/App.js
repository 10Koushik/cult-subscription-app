import React, { useState } from 'react';
import API from './api';

function App() {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  // LOGIN
  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login', {
        userId,
        email,
      });
      console.log(userId);
      console.log(email);

      localStorage.setItem('token', res.data.access_token);
      console.log("token",res.data.access_token);
      
      setMessage('✅ Login successful');
    } catch (err) {
      setMessage('❌ Login failed');
    }
  };

  // SUBSCRIBE
  const handleSubscribe = async () => {
    try {
      const res = await API.post('/subscription/subscribe', {
        userId,
        plan: 'premium',
        amount: 500,
        email,
      });

      setMessage(res.data.message);
    } catch (err) {
      setMessage('❌ Subscription failed');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Cult Subscription App</h2>

      <input
        placeholder="User ID"
        onChange={(e) => setUserId(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Email"
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