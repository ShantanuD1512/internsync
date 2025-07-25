import React, { useEffect, useState } from 'react';
import './StudentDashboard.css'; // You can create this file or use formStyles.css
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState({});
  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);

  // Dummy Data
  useEffect(() => {
    // Simulate API call
    const fetchData = () => {
      setStudentInfo({
        fullName: 'Arjun Verma',
        email: 'arjun@example.com',
        contact: '9876543210',
        gender: 'Male',
      });

      setApplications([
        { id: 1, title: 'Web Developer Internship', company: 'TechNova', status: 'Pending' },
        { id: 2, title: 'Data Analyst Intern', company: 'DataEdge', status: 'Selected' },
      ]);

      setInterviews([
        { id: 1, internship: 'Data Analyst Intern', company: 'DataEdge', date: '2025-07-30', time: '11:00 AM' },
      ]);
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // clear JWT
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <section className="dashboard-section">
        <h2>Profile</h2>
        <p><strong>Name:</strong> {studentInfo.fullName}</p>
        <p><strong>Email:</strong> {studentInfo.email}</p>
        <p><strong>Contact:</strong> {studentInfo.contact}</p>
        <p><strong>Gender:</strong> {studentInfo.gender}</p>
      </section>

      <section className="dashboard-section">
        <h2>Applied Internships</h2>
        {applications.length > 0 ? (
          <ul>
            {applications.map((app) => (
              <li key={app.id}>
                <strong>{app.title}</strong> at {app.company} — <span className={`status-${app.status.toLowerCase()}`}>{app.status}</span>
              </li>
            ))}
          </ul>
        ) : <p>No applications submitted yet.</p>}
      </section>

      <section className="dashboard-section">
        <h2>Interview Schedule</h2>
        {interviews.length > 0 ? (
          <ul>
            {interviews.map((intv) => (
              <li key={intv.id}>
                Interview for <strong>{intv.internship}</strong> at {intv.company} on <strong>{intv.date}</strong> at <strong>{intv.time}</strong>
              </li>
            ))}
          </ul>
        ) : <p>No interviews scheduled.</p>}
      </section>
    </div>
  );
};

export default StudentDashboard;
