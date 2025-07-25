import React, { useState } from 'react';
import './formStyles.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const dummyUser = {
      email: 'student@example.com',
      password: 'student123',
      token: 'mock-jwt-token-12345'
    };

    if (email === dummyUser.email && password === dummyUser.password) {
      localStorage.setItem('token', dummyUser.token);
      alert('Login successful!');
      navigate('/student/dashboard');
    } else {
      setError('Invalid email or password');
    }

    // ✅ TODO: Replace this block below when backend is ready
    /*
    try {
      const response = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('Login successful!');
        navigate('/student/dashboard');
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch (err) {
      setError('Login failed. Please try again later.');
    }
    */
  };

  return (
    <div className="form-container horizontal-layout modern-light-theme">
      <div className="login-left">
        <h1 className="login-heading">Welcome to InternSync</h1>
        <p className="login-tagline">Streamline your internship journey</p>
      </div>

      <div className="form-card styled-card login-right">
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleLogin} className="form-content">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="error-text">{error}</div>}
          <button type="submit" className="submit-btn">Login</button>
        </form>

        <div className="footer-link">
          <p style={{ marginBottom: '0.5rem' }}>Sign up as:&nbsp;
            <span className="signup-link" onClick={() => navigate('/register-student')}>Student</span> |
            <span className="signup-link" onClick={() => navigate('/register-org')}>Organization</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
