import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerStudent } from '../api/api';

const RegisterStudentPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    gender: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};

    // Name: Required, only letters and spaces
    if (!formData.name.trim()) {
      errs.name = 'Name is required';
    } else {
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(formData.name.trim())) {
        errs.name = 'Name can contain only letters and spaces';
      }
    }

    // Email: Required, valid format
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errs.email = 'Invalid email format';
      }
    }

    // Password: Required, 6+ chars, uppercase, lowercase, digit, special char
    if (!formData.password.trim()) {
      errs.password = 'Password is required';
    } else {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
      if (!passwordRegex.test(formData.password)) {
        errs.password =
          'Password must be at least 6 characters and include uppercase, lowercase, number & special character';
      }
    }

    // Contact: Required, exactly 10 digits numeric
    if (!formData.contact.trim()) {
      errs.contact = 'Contact is required';
    } else {
      const contactRegex = /^\d{10}$/;
      if (!contactRegex.test(formData.contact)) {
        errs.contact = 'Contact must be a valid 10-digit number';
      }
    }

    // Gender: Required
    if (!formData.gender.trim()) {
      errs.gender = 'Gender is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      await registerStudent(formData);
      alert('Student registered successfully. Please login.');
      navigate('/');
    } catch (error) {
      alert('Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page d-flex align-items-center justify-content-center min-vh-100 px-3 bg-light">
      <div
        className="register-card shadow rounded-4 p-4 p-md-5 bg-white"
        style={{ maxWidth: '480px', width: '100%' }}
      >
        <h2 className="text-center mb-4 fw-bold text-primary">Register as Student</h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          {/* Email Address */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              autoComplete="email"
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="new-password"
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            {!errors.password && (
              <div className="form-text">
                Minimum 6 characters including uppercase, lowercase, number & special character
              </div>
            )}
          </div>

          {/* Contact Number */}
          <div className="mb-3">
            <label htmlFor="contact" className="form-label fw-semibold">
              Contact Number
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              className={`form-control ${errors.contact ? 'is-invalid' : ''}`}
              value={formData.contact}
              onChange={handleChange}
              placeholder="10-digit phone number"
              maxLength={10}
              autoComplete="tel"
            />
            {errors.contact && <div className="invalid-feedback">{errors.contact}</div>}
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label htmlFor="gender" className="form-label fw-semibold">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Registering...
              </>
            ) : (
              'Register as Student'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterStudentPage;
