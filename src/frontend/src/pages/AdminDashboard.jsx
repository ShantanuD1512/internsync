import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [organizations, setOrganizations] = useState([]);
  const [students, setStudents] = useState([]);
  const [loadingOrgs, setLoadingOrgs] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(true);

  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    // Optional: clear tokens or localStorage
    // localStorage.clear();
    navigate('/');
  };

  // Fetch organizations
  const fetchOrganizations = async () => {
    try {
      setLoadingOrgs(true);
      const response = await fetch('http://localhost:5000/api/admin/organizations');
      const data = await response.json();
      setOrganizations(data);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    } finally {
      setLoadingOrgs(false);
    }
  };

  // Approve organization
  const approveOrganization = async (orgId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/approve/${orgId}`, {
        method: 'PUT',
      });

      if (response.ok) {
        alert('Organization approved!');
        fetchOrganizations(); // Refresh list
      } else {
        alert('Failed to approve organization.');
      }
    } catch (error) {
      console.error('Error approving organization:', error);
    }
  };

  // Fetch students with education and skills
  const fetchStudents = async () => {
    try {
      setLoadingStudents(true);
      const response = await fetch('http://localhost:5000/api/admin/students');  // Corrected API URL
      const data = await response.json();
      console.log('Students data from backend:', data); // Debug log
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoadingStudents(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
    fetchStudents();
  }, []);

  return (
    <div className="container py-5">
      {/* Header with Logout */}
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h2 className="fw-bold text-primary mb-0">Welcome to Admin Dashboard</h2>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>

      {/* Organization Card */}
      <div className="card shadow mb-5">
        <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Pending Organizations</h5>
          {loadingOrgs && <span className="spinner-border spinner-border-sm" />}
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Registration Number</th>
                  <th>Approved</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {organizations
                  .filter((org) => !org.isApproved)
                  .map((org) => (
                    <tr key={org.organization_id}>
                      <td>{org.organization_id}</td>
                      <td>{org.org_name}</td>
                      <td>{org.registrationNumber}</td>
                      <td>
                        <span
                          className={`badge ${
                            org.isApproved ? 'bg-success' : 'bg-warning text-dark'
                          }`}
                        >
                          {org.isApproved ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => approveOrganization(org.organization_id)}
                          className="btn btn-success btn-sm"
                        >
                          Approve
                        </button>
                      </td>
                    </tr>
                  ))}
                {!loadingOrgs && organizations.filter((org) => !org.isApproved).length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      No pending organizations 🎉
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Student Table */}
      <div className="card shadow">
        <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">All Students</h5>
          {loadingStudents && <span className="spinner-border spinner-border-sm" />}
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Education</th>
                  <th>Skills</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.studentId}>
                    <td>{student.studentId}</td>
                    <td>{student.studentName}</td>
                    <td>{student.gender}</td>
                    <td>
                      {student.education && student.education.length > 0 ? (
                        student.education.map((edu, index) => (
                          <div key={index}>
                            {edu.level} at {edu.institutionName} ({edu.passingYear})
                          </div>
                        ))
                      ) : (
                        '-'
                      )}
                    </td>
                    <td>
                      {student.skills && student.skills.length > 0
                        ? student.skills.join(', ')
                        : '-'}
                    </td>
                  </tr>
                ))}
                {!loadingStudents && students.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
