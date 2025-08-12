import React, { useState, useEffect, useCallback } from 'react';
import './ScheduleInterviews.css';

const ScheduleInterviews = ({ organizationId }) => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    internshipTitle: '',
    interviewDateTime: '',
    mode: 'Online',
    instructions: '',
  });

  // ✅ Fetch interviews using useCallback
  const fetchInterviews = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/org/interviews?organizationId=${organizationId}`);
      if (!res.ok) throw new Error('Failed to fetch interviews');
      const data = await res.json();
      setInterviews(data);
    } catch (err) {
      setError(err.message || 'Error fetching interviews');
    } finally {
      setLoading(false);
    }
  }, [organizationId]);

  useEffect(() => {
    if (organizationId) {
      fetchInterviews();
    }
  }, [organizationId, fetchInterviews]);

  const openModal = () => {
    setFormData({
      studentName: '',
      internshipTitle: '',
      interviewDateTime: '',
      mode: 'Online',
      instructions: '',
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { studentName, internshipTitle, interviewDateTime, mode, instructions } = formData;
    if (!studentName || !internshipTitle || !interviewDateTime || !mode) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const res = await fetch('/api/org/interviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName,
          internshipTitle,
          interviewDateTime,
          mode,
          instructions,
          organizationId
        }),
      });
      if (!res.ok) throw new Error('Failed to schedule interview');
      const newInterview = await res.json();
      setInterviews(prev => [...prev, newInterview]);
      setShowModal(false);
    } catch (err) {
      alert(err.message || 'Error scheduling interview');
    }
  };

  const deleteInterview = async (id) => {
    if (!window.confirm('Are you sure you want to delete this interview?')) return;
    try {
      const res = await fetch(`/api/org/interviews/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete interview');
      setInterviews(prev => prev.filter(intv => intv.id !== id));
    } catch (err) {
      alert(err.message || 'Error deleting interview');
    }
  };

  return (
    <div className="schedule-container">
      <h2>📅 Scheduled Interviews</h2>

      <button className="add-btn" onClick={openModal}>➕ Schedule Interview</button>

      {loading && <p>Loading interviews...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && interviews.length === 0 && <p>No interviews scheduled yet.</p>}

      {!loading && interviews.length > 0 && (
        <table className="interview-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Internship</th>
              <th>Date & Time</th>
              <th>Mode</th>
              <th>Instructions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((int, index) => (
              <tr key={int.id}>
                <td>{index + 1}</td>
                <td>{int.studentName}</td>
                <td>{int.internshipTitle}</td>
                <td>{new Date(int.interviewDateTime).toLocaleString()}</td>
                <td>{int.mode}</td>
                <td>{int.instructions}</td>
                <td>
                  <button className="del-btn" onClick={() => deleteInterview(int.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Schedule Interview</h3>

            <input
              type="text"
              name="studentName"
              placeholder="Student Name"
              value={formData.studentName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="internshipTitle"
              placeholder="Internship Title"
              value={formData.internshipTitle}
              onChange={handleChange}
              required
            />

            <input
              type="datetime-local"
              name="interviewDateTime"
              value={formData.interviewDateTime}
              onChange={handleChange}
              required
            />

            <select name="mode" value={formData.mode} onChange={handleChange}>
              <option value="Online">Online</option>
              <option value="In-person">In-person</option>
            </select>

            <textarea
              name="instructions"
              placeholder="Instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows={3}
            />

            <div className="modal-buttons">
              <button onClick={closeModal}>Cancel</button>
              <button onClick={handleSubmit}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleInterviews;
