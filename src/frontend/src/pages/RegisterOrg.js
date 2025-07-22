import React, { useState } from 'react';

const RegisterOrg = () => {
  const [org, setOrg] = useState({
    orgName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    website: '',
  });

  const handleChange = (e) => {
    setOrg({ ...org, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Organization Registered:\n${JSON.stringify(org, null, 2)}`);
    // Replace with API call later
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h3 className="mb-4 text-center">Organization Registration</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="orgName" className="form-label">Organization Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="orgName" 
            name="orgName"
            required
            value={org.orgName}
            onChange={handleChange}
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            name="email"
            required
            value={org.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            name="password"
            required
            value={org.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input 
            type="tel" 
            className="form-control" 
            id="phone" 
            name="phone"
            value={org.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <textarea 
            className="form-control" 
            id="address" 
            name="address"
            rows="3"
            value={org.address}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="website" className="form-label">Website URL</label>
          <input 
            type="url" 
            className="form-control" 
            id="website" 
            name="website"
            value={org.website}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-success w-100">Register Organization</button>
      </form>
    </div>
  );
};

export default RegisterOrg;
