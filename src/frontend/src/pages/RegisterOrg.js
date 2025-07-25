import React, { useState, useEffect } from 'react';
import './formStyles.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerOrg, resetOrgStatus } from '../redux/slices/orgSlice';

const RegisterOrg = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.org);

  const [formData, setFormData] = useState({
    name: '',
    regNumber: '',
    email: '',
    password: '',
    contact: '',
  });

  useEffect(() => {
    if (success) {
      alert('Organization registered successfully!');
      navigate('/login');
      dispatch(resetOrgStatus());
    }
  }, [success, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerOrg(formData));
  };

  return (
    <div className="form-container vertical-layout modern-light-theme">
      <div className="form-card styled-card">
        <h2 className="form-title">Organization Registration</h2>
        <form className="form-content" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Organization Name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="regNumber" placeholder="Registration Number" value={formData.regNumber} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required />
          {error && <div className="error-text">{error}</div>}
          <button type="submit" className="submit-btn" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
        </form>

        <div className="footer-link">
          Already have an account?{' '}
          <span className="signup-link" onClick={() => navigate('/login')}>Login here</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterOrg;
