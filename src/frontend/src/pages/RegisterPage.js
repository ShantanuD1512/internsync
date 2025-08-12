import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDomains, registerOrganization, registerOrgUser } from '../api/api';
import './RegisterPage.css';

const RegisterPage = () => {
  const [domains, setDomains] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    orgName: '',
    registrationNumber: '',
    domainId: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getDomains()
      .then(res => setDomains(res.data))
      .catch(() => alert('Failed to load domains'));
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear specific field error on user input to enhance UX
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};

    if (!/^[A-Za-z\s]{2,}$/.test(formData.name))
      errs.name = 'Name should contain only letters and spaces';

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
      errs.email = 'Invalid email format';

    if (
      !/^.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/.test(
        formData.password
      )
    )
      errs.password =
        'Password must be at least 6 characters and include uppercase, lowercase, number, and special character';

    if (!/^\d{10}$/.test(formData.contact))
      errs.contact = 'Contact must be a 10-digit number';

    if (!formData.orgName.trim())
      errs.orgName = 'Organization name is required';

    if (!formData.registrationNumber.trim())
      errs.registrationNumber = 'Registration number is required';

    if (!formData.domainId)
      errs.domainId = 'Please select a domain';

    setErrors(errs);
    return errs;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const userRes = await registerOrgUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        contact: formData.contact
      });

      const userId = userRes.data;

      if (!userId || userId === 0) {
        alert('User registration failed');
        return;
      }

      const orgData = {
        organizationId: userId,
        userId: userId,
        orgName: formData.orgName,
        registrationNumber: formData.registrationNumber,
        domainId: formData.domainId
      };

      await registerOrganization(orgData);

      alert('Registration successful! You can now login.');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Organization registration failed. Try again.');
    }
  };

  return (
    <div className="register-page d-flex justify-content-center align-items-center min-vh-100 px-3">
      <div className="register-card shadow rounded-4 p-4 p-md-5">
        <h2 className="text-center mb-4 fw-bold text-primary">Register Organization</h2>

        <form
          className="register-form"
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
          noValidate
        >
          {/* User Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold">
              User Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              autoComplete="name"
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
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
                At least 6 characters with uppercase, lowercase, number & special character
              </div>
            )}
          </div>

          {/* Contact */}
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
              autoComplete="tel"
              maxLength={10}
            />
            {errors.contact && <div className="invalid-feedback">{errors.contact}</div>}
          </div>

          {/* Organization Name */}
          <div className="mb-3">
            <label htmlFor="orgName" className="form-label fw-semibold">
              Organization Name
            </label>
            <input
              type="text"
              id="orgName"
              name="orgName"
              className={`form-control ${errors.orgName ? 'is-invalid' : ''}`}
              value={formData.orgName}
              onChange={handleChange}
              placeholder="Enter organization name"
            />
            {errors.orgName && <div className="invalid-feedback">{errors.orgName}</div>}
          </div>

          {/* Registration Number */}
          <div className="mb-3">
            <label htmlFor="registrationNumber" className="form-label fw-semibold">
              Registration Number
            </label>
            <input
              type="text"
              id="registrationNumber"
              name="registrationNumber"
              className={`form-control ${errors.registrationNumber ? 'is-invalid' : ''}`}
              value={formData.registrationNumber}
              onChange={handleChange}
              placeholder="Enter registration number"
            />
            {errors.registrationNumber && (
              <div className="invalid-feedback">{errors.registrationNumber}</div>
            )}
          </div>

          {/* Domain */}
          <div className="mb-4">
            <label htmlFor="domainId" className="form-label fw-semibold">
              Domain
            </label>
            <select
              id="domainId"
              name="domainId"
              className={`form-select ${errors.domainId ? 'is-invalid' : ''}`}
              value={formData.domainId}
              onChange={handleChange}
            >
              <option value="">Select Domain</option>
              {domains.map(domain => (
                <option key={domain.domainId} value={domain.domainId}>
                  {domain.name}
                </option>
              ))}
            </select>
            {errors.domainId && <div className="invalid-feedback">{errors.domainId}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
