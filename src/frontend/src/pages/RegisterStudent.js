import React, { useState, useEffect } from 'react';
import './formStyles.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerStudent, resetStudentStatus } from '../redux/slices/studentSlice';

const RegisterStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.student);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    contact: '',
    gender: '',
  });

  useEffect(() => {
    if (success) {
      alert('Student registered successfully!');
      navigate('/login');
      dispatch(resetStudentStatus());
    }
  }, [success, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerStudent(formData));
  };

  return (
    <div className="form-container vertical-layout modern-light-theme">
      <div className="form-card styled-card">
        <h2 className="form-title">Student Registration</h2>
        <form className="form-content" onSubmit={handleSubmit}>
          <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required />
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
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

export default RegisterStudent;
