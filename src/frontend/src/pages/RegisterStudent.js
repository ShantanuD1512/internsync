import React, { useState } from 'react';

const RegisterStudent = () => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    dob: '',
    branch: '',
    year: '',
    skills: '',
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Student Registered:\n${JSON.stringify(student, null, 2)}`);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h3 className="mb-4 text-center">Student Registration</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            name="name"
            required
            value={student.name}
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
            value={student.email}
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
            value={student.password}
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
            value={student.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="dob" className="form-label">Date of Birth</label>
          <input 
            type="date" 
            className="form-control" 
            id="dob" 
            name="dob"
            value={student.dob}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="branch" className="form-label">Branch</label>
          <input 
            type="text" 
            className="form-control" 
            id="branch" 
            name="branch"
            value={student.branch}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="year" className="form-label">Year</label>
          <select 
            className="form-select" 
            id="year" 
            name="year"
            value={student.year}
            onChange={handleChange}
          >
            <option value="">Select Year</option>
            <option value="1st">1st Year</option>
            <option value="2nd">2nd Year</option>
            <option value="3rd">3rd Year</option>
            <option value="4th">4th Year</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="skills" className="form-label">Skills (comma separated)</label>
          <input 
            type="text" 
            className="form-control" 
            id="skills" 
            name="skills"
            value={student.skills}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-success w-100">Register Student</button>
      </form>
    </div>
  );
};

export default RegisterStudent;
