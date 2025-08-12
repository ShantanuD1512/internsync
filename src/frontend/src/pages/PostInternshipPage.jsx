import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createInternship } from '../api/api';
import './PostInternshipPage.css';

const PostInternshipPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const organizationId = state?.organizationId ?? 0;

  const [formData, setFormData] = useState({
    organizationId,
    categoryId: '',
    title: '',
    description: '',
    location: '',
    duration: '',
    stipend: '',
    mode: '',
    deadline: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.description.split(' ').length > 200) newErrors.description = 'Max 200 words allowed';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
    if (!formData.stipend.trim()) newErrors.stipend = 'Stipend is required';
    if (!formData.mode) newErrors.mode = 'Select mode';
    if (!formData.deadline) newErrors.deadline = 'Deadline is required';
    if (!formData.categoryId || isNaN(formData.categoryId)) newErrors.categoryId = 'Valid category ID required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await createInternship(formData);
      if (response?.data?.includes("successfully")) {
        alert("Internship created successfully!");
        navigate('/org-dashboard', { state: state });
      } else {
        alert("Failed to create internship: " + response?.data);
      }
    } catch (error) {
      alert("Error while posting internship");
      console.error("Submit Error:", error);
    }
  };

  const handleBack = () => {
    navigate('/org-dashboard', { state: state });
  };

  return (
    <div className="post-container">
      {/* Header with Back button in top-right */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="post-title">Post New Internship</h2>
        <button
          type="button"
          onClick={handleBack}
          className="btn btn-outline-secondary"
        >
          ← Back to Dashboard
        </button>
      </div>

      <form className="post-form" onSubmit={handleSubmit} noValidate>

        <label>Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter internship title" />
        {errors.title && <span className="error-text">{errors.title}</span>}

        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Max 200 words" />
        {errors.description && <span className="error-text">{errors.description}</span>}

        <label>Location</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="City / Remote / etc." />
        {errors.location && <span className="error-text">{errors.location}</span>}

        <label>Duration</label>
        <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g., 6 weeks" />
        {errors.duration && <span className="error-text">{errors.duration}</span>}

        <label>Stipend</label>
        <input type="text" name="stipend" value={formData.stipend} onChange={handleChange} placeholder="e.g., ₹5000" />
        {errors.stipend && <span className="error-text">{errors.stipend}</span>}

        <label>Mode</label>
        <select name="mode" value={formData.mode} onChange={handleChange}>
          <option value="">Select Mode</option>
          <option value="Remote">Remote</option>
          <option value="Onsite">Onsite</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        {errors.mode && <span className="error-text">{errors.mode}</span>}

        <label>Deadline</label>
        <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} />
        {errors.deadline && <span className="error-text">{errors.deadline}</span>}

        <label>Category ID</label>
        <input type="number" name="categoryId" value={formData.categoryId} onChange={handleChange} placeholder="Temporary ID" />
        {errors.categoryId && <span className="error-text">{errors.categoryId}</span>}

        <button type="submit" className="btn btn-primary mt-3">Create Internship</button>
      </form>
    </div>
  );
};

export default PostInternshipPage;
