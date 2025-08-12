import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const STATUS_OPTIONS = [
  { id: 1, label: "Applied" },
  { id: 2, label: "In Review" },
  { id: 3, label: "Shortlisted" },
  { id: 4, label: "Interview Scheduled" },
  { id: 5, label: "Rejected" },
  { id: 6, label: "Selected" }
];

// Helper to format date-time for input[type=datetime-local]
function formatDateTimeLocal(dtString) {
  if (!dtString) return '';
  const dt = new Date(dtString);
  const iso = dt.toISOString();
  return iso.substring(0, iso.length - 1); // remove trailing 'Z' for local datetime
}

const OrgScheduleInterviews = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state;

  const [loading, setLoading] = useState(true);
  const [interviews, setInterviews] = useState([]);
  const [error, setError] = useState('');

  // Fetch initial data on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  async function fetchAllData() {
    setLoading(true);
    setError('');
    try {
      if (!user?.userId) throw new Error('User not logged in');

      const orgId = (await axios.get(`http://localhost:8080/api/org/user/${user.userId}`)).data;
      const internships = (await axios.get(`http://localhost:8080/api/org/internship/all/${orgId}`)).data;
      const internshipIds = internships.map(i => i.internshipId);
      if (internshipIds.length === 0) {
        setInterviews([]);
        setLoading(false);
        return;
      }
      let params = new URLSearchParams();
      internshipIds.forEach(id => params.append('internshipIds', id));
      const apps = (await axios.get(`http://localhost:8080/applications/internships?${params.toString()}`)).data;

      const appIds = apps.map(a => a.applicationId);
      if (appIds.length === 0) {
        setInterviews([]);
        setLoading(false);
        return;
      }
      params = new URLSearchParams();
      appIds.forEach(id => params.append('applicationIds', id));
      const interviewsData = (await axios.get(`http://localhost:8080/api/org/interviews?${params.toString()}`)).data;

      setInterviews(interviewsData);

    } catch (err) {
      setError(err.message || 'Failed to fetch interview schedules');
    } finally {
      setLoading(false);
    }
  }

  // Delete interview
  async function deleteInterview(id) {
    if (!window.confirm('Are you sure you want to delete this interview?')) return;
    try {
      await axios.delete(`http://localhost:8080/api/org/interviews/${id}`);
      fetchAllData();
    } catch (err) {
      alert('Error deleting: ' + (err.response?.data || err.message));
    }
  }

  // Change status inline
  async function updateStatus(id, newStatusId) {
    try {
      await axios.put(`http://localhost:8080/api/org/interviews/${id}/status`, { interviewStatusId: newStatusId });
      fetchAllData();
    } catch (err) {
      alert('Error updating status: ' + (err.response?.data || err.message));
    }
  }

  // Back button handler
  const handleBack = () => {
    navigate('/org-dashboard', { state: user });
  };

  return (
    <div className="container my-4" style={styles.wrapper}>
      <div style={styles.header}>
        {/* Back Button styled like other pages */}
        <button onClick={handleBack} style={styles.backButton}>
          ← Back to Dashboard
        </button>

        <h3 style={styles.heading}>Scheduled Interviews</h3>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && interviews.length === 0 && <p>No interviews scheduled.</p>}

      {!loading && interviews.length > 0 && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Schedule ID</th>
              <th>Application ID</th>
              <th>Date & Time</th>
              <th>Mode</th>
              <th>Instructions</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map(intv => (
              <tr key={intv.scheduleId}>
                <td>{intv.scheduleId}</td>
                <td>{intv.applicationId}</td>
                <td>{intv.interviewDateTime ? new Date(intv.interviewDateTime).toLocaleString() : ''}</td>
                <td>{intv.mode}</td>
                <td>{intv.instructions}</td>
                <td>
                  <select
                    className="form-select"
                    value={intv.interviewStatusId || 4}
                    onChange={(e) => updateStatus(intv.scheduleId, parseInt(e.target.value))}
                    aria-label="Update Interview Status"
                  >
                    {STATUS_OPTIONS.map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteInterview(intv.scheduleId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Matching styles from other pages
const styles = {
  wrapper: {
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    padding: '20px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    position: 'relative'
  },
  backButton: {
    position: 'absolute',
    left: '20px',
    top: '0',
    padding: '8px 14px',
    fontSize: '14px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background 0.2s ease'
  },
  heading: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2c3e50'
  }
};

export default OrgScheduleInterviews;
