import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, fetchStudentId } from '../api/api';
import './LoginPage.css'; // Your custom CSS

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        'Password must have 6+ characters, including uppercase, lowercase, number & special character';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const res = await login({ email, password });
      const user = res.data;

      if (user.roleId === 1) {
        navigate('/admin-dashboard', { state: user });
      } else if (user.roleId === 2) {
        // Fetch the studentId by userId before navigating
        try {
          const studentResp = await fetchStudentId(user.userId);
          const studentId = studentResp.studentId;

          if (!studentId) {
            alert('Student profile not found. Please contact support.');
            return;
          }

          // Pass both studentId and user info in state for StudentDashboard
          navigate('/student-dashboard', { state: { studentId, user } });
        } catch (err) {
          alert('Failed to fetch student profile. Please try again.');
          console.error('fetchStudentId error:', err);
        }
      } else if (user.roleId === 3) {
        navigate('/org-dashboard', { state: user });
      } else {
        alert('Unknown role');
      }
    } catch (err) {
      alert('Login failed: Invalid credentials or server issue');
    }
  };

  return (
    <div className="login-bg d-flex align-items-center justify-content-center min-vh-100 px-3">
      <div className="login-card p-5 rounded-4 shadow-lg">
        <h2 className="text-center mb-4 fw-bold text-primary">InternSync</h2>

        {/* Email Input */}
        <div className="mb-4 position-relative">
          <label htmlFor="email" className="form-label fw-semibold">
            Email Address
          </label>
          <div className="input-icon-wrapper">
            <i className="bi bi-envelope-fill text-secondary input-icon"></i>
            <input
              type="email"
              id="email"
              className={`form-control form-control-lg rounded-3 ps-5 ${
                errors.email ? 'is-invalid' : ''
              }`}
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>
          {errors.email ? (
            <div className="invalid-feedback d-block">{errors.email}</div>
          ) : (
            <div className="form-text">Format: example@domain.com</div>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-4 position-relative">
          <label htmlFor="password" className="form-label fw-semibold">
            Password
          </label>
          <div className="input-group input-icon-wrapper">
            <i className="bi bi-key-fill text-secondary input-icon ps-3"></i>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className={`form-control form-control-lg rounded-start-3 ps-5 ${
                errors.password ? 'is-invalid' : ''
              }`}
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="btn btn-outline-secondary rounded-end-3 toggle-password-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
            </button>
          </div>
          {errors.password ? (
            <div className="invalid-feedback d-block">{errors.password}</div>
          ) : (
            <div className="form-text">
              Minimum 6 characters with uppercase, lowercase, number & special character
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="d-grid gap-3">
          <button className="btn btn-primary btn-lg rounded-3 fw-semibold" onClick={handleLogin}>
            Login
          </button>
          <button className="btn btn-outline-primary rounded-3 fw-semibold" onClick={() => navigate('/register')}>
            Sign Up as Organization
          </button>
          <button
            className="btn btn-outline-info rounded-3 fw-semibold"
            onClick={() => navigate('/register-student')}
          >
            Sign Up as Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
