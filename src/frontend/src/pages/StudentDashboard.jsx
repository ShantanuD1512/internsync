import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import './StudentDashboard.css';

const StudentDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const studentId = location.state?.studentId;

  const [dashboard, setDashboard] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedStudent, setUpdatedStudent] = useState({});
  const [loading, setLoading] = useState({});
  const [applyingId, setApplyingId] = useState(null);
  const [newEducation, setNewEducation] = useState({ level: "", institutionName: "", board: "", grade: "", passingYear: "" });
  const [addingEducation, setAddingEducation] = useState(false);
  const [editingEducationId, setEditingEducationId] = useState(null);
  const [editingEducation, setEditingEducation] = useState({});
  const [newSkillName, setNewSkillName] = useState("");
  const [addingSkill, setAddingSkill] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [editingSkillName, setEditingSkillName] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    if (!studentId) {
      alert("You must be logged in.");
      navigate("/");
    }
  }, [studentId, navigate]);

  const fetchResumes = () => {
    if (!dashboard?.student?.studentId) return;

    axios.get(`http://localhost:8080/documents/student/${dashboard.student.studentId}`)
      .then(res => {
        const resumesOnly = (res.data || []).filter(doc => doc.docType === "Resume");
        setResumes(resumesOnly);
      })
      .catch(() => setResumes([]));
  };

  const fetchDashboard = () => {
    if (!studentId) return;
    axios.get(`http://localhost:8080/students/${studentId}/dashboard`)
      .then(res => {
        setDashboard(res.data);
        setInterviews(res.data.interviews || []);
        resetFormStates();
        fetchResumes();
      })
      .catch(() => alert("Failed to load dashboard."));
  };

  useEffect(fetchDashboard, [studentId]);

  const resetFormStates = () => {
    setAddingEducation(false);
    setEditingEducationId(null);
    setEditingEducation({});
    setAddingSkill(false);
    setEditingSkillId(null);
    setEditingSkillName("");
  };

  const applyInternship = (internshipId) => {
    if (!dashboard?.student?.studentId) return;
    setApplyingId(internshipId);
    setLoading(prev => ({ ...prev, apply: true }));
    axios.post("http://localhost:8080/applications/apply", null, {
      params: { studentId: dashboard.student.studentId, internshipId }
    })
      .then(() => {
        alert("Applied successfully!");
        fetchDashboard();
      })
      .catch(() => alert("Application failed."))
      .finally(() => {
        setApplyingId(null);
        setLoading(prev => ({ ...prev, apply: false }));
      });
  };

  const updateProfile = () => {
    setLoading(prev => ({ ...prev, profile: true }));

    axios.put(`http://localhost:8080/students/${dashboard.student.studentId}`, updatedStudent)
      .then(() => {
        alert("Profile updated!");
        setDashboard(prev => ({
          ...prev,
          student: {
            ...prev.student,
            ...updatedStudent
          }
        }));
        setEditMode(false);
      })
      .catch(() => {
        alert("Failed to update profile.");
      })
      .finally(() => setLoading(prev => ({ ...prev, profile: false })));
  };

  // Education handlers
  const addEducation = () => {
    if (!newEducation.level.trim() || !newEducation.institutionName.trim() || !newEducation.passingYear) {
      alert("Fill all required education fields.");
      return;
    }
    setLoading(prev => ({ ...prev, educationSave: true }));
    axios.post(`http://localhost:8080/students/${dashboard.student.studentId}/education`, newEducation)
      .then(() => {
        alert("Education added!");
        setNewEducation({ level: "", institutionName: "", board: "", grade: "", passingYear: "" });
        setAddingEducation(false);
        fetchDashboard();
      })
      .catch(() => alert("Failed to add education."))
      .finally(() => setLoading(prev => ({ ...prev, educationSave: false })));
  };

  const startEditEducation = (edu) => {
    setEditingEducationId(edu.educationId);
    setEditingEducation({ ...edu });
  };

  const saveEditedEducation = () => {
    if (!editingEducation.level.trim() || !editingEducation.institutionName.trim() || !editingEducation.passingYear) {
      alert("Fill all required education fields.");
      return;
    }
    setLoading(prev => ({ ...prev, educationSave: true }));
    axios.put(`http://localhost:8080/educations/${editingEducationId}`, editingEducation)
      .then(() => {
        alert("Education updated!");
        setEditingEducationId(null);
        setEditingEducation({});
        fetchDashboard();
      })
      .catch(() => alert("Failed to update education."))
      .finally(() => setLoading(prev => ({ ...prev, educationSave: false })));
  };

  const deleteEducation = (id) => {
    if (window.confirm("Delete this education?")) {
      axios.delete(`http://localhost:8080/educations/${id}`)
        .then(() => {
          alert("Deleted education.");
          fetchDashboard();
        })
        .catch(() => alert("Failed to delete education."));
    }
  };

  // Skill handlers
  const addSkill = () => {
    if (!newSkillName.trim()) {
      alert("Enter skill name.");
      return;
    }
    setLoading(prev => ({ ...prev, skillSave: true }));
    axios.post(`http://localhost:8080/students/${dashboard.student.studentId}/skills`, { skillName: newSkillName.trim() })
      .then(() => {
        alert("Skill added!");
        setNewSkillName("");
        setAddingSkill(false);
        fetchDashboard();
      })
      .catch(() => alert("Failed to add skill."))
      .finally(() => setLoading(prev => ({ ...prev, skillSave: false })));
  };

  const startEditSkill = (skill) => {
    setEditingSkillId(skill.skillId);
    setEditingSkillName(skill.skillName);
  };

  const saveEditedSkill = () => {
    if (!editingSkillName.trim()) {
      alert("Enter skill name.");
      return;
    }
    setLoading(prev => ({ ...prev, skillSave: true }));
    axios.put(`http://localhost:8080/skills/${editingSkillId}`, { skillName: editingSkillName })
      .then(() => {
        alert("Skill updated!");
        setEditingSkillId(null);
        setEditingSkillName("");
        fetchDashboard();
      })
      .catch(() => alert("Failed to update skill."))
      .finally(() => setLoading(prev => ({ ...prev, skillSave: false })));
  };

  const deleteSkill = (id) => {
    if (window.confirm("Delete this skill?")) {
      axios.delete(`http://localhost:8080/skills/${id}`)
        .then(() => {
          alert("Deleted skill.");
          fetchDashboard();
        })
        .catch(() => alert("Failed to delete skill."));
    }
  };

  // Resume upload handling
  const handleFileChange = e => {
    if (e.target.files.length) setResumeFile(e.target.files[0]);
  };

  const uploadResume = () => {
    if (!resumeFile || !dashboard?.student?.studentId) {
      alert("Select resume file.");
      return;
    }
    setLoading(prev => ({ ...prev, upload: true }));
    const formData = new FormData();
    formData.append("file", resumeFile);
    formData.append("studentId", dashboard.student.studentId);
    formData.append("docType", "Resume");
    axios.post("http://localhost:8080/documents/upload", formData, { headers: { "Content-Type": "multipart/form-data" } })
      .then(() => {
        alert("Resume uploaded!");
        setResumeFile(null);
        fetchDashboard();
      })
      .catch(() => alert("Failed to upload."))
      .finally(() => setLoading(prev => ({ ...prev, upload: false })));
  };

  const logout = () => navigate("/");

  // Create a map of internshipId -> internship object for quick lookup
  const internshipMap = React.useMemo(() => {
    if (!dashboard?.internships) return {};
    const map = {};
    dashboard.internships.forEach(internship => {
      map[internship.internshipId] = internship;
    });
    return map;
  }, [dashboard?.internships]);

  if (!dashboard) return <div className="d-flex justify-content-center align-items-center min-vh-100"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading dashboard...</span></div></div>;

  return (
    <div className="student-dashboard">
      <div className="container my-4">
        <header className="dashboard-header d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <h2 className="text-gradient mb-0">🎓 Student Dashboard</h2>
          <div>
            {!editMode &&
              <button className="btn btn-outline-light btn-enhanced me-2" onClick={() => { setUpdatedStudent(dashboard.student); setEditMode(true); }}>
                ✏️ Edit Profile
              </button>}
            <button className="btn btn-danger btn-enhanced" onClick={logout}>🚪 Logout</button>
          </div>
        </header>

        <div className="row gy-4">
          {/* Left Column */}
          <div className="col-lg-4 col-md-6">
            <div className="profile-card card shadow-sm p-4 h-100 overflow-auto animate-fade-in" style={{ maxHeight: "90vh" }}>
              {/* Profile */}
              <div className="section-header">
                👤 Profile Information
              </div>
              {!editMode ? (
                <div className="mb-4">
                  <p className="mb-2"><strong>Name:</strong> <span className="text-primary">{dashboard.student.studentName || "-"}</span></p>
                  <p className="mb-2"><strong>Student ID:</strong> <span className="text-muted">{dashboard.student.studentId || "-"}</span></p>
                  <p className="mb-0"><strong>Gender:</strong> <span className="text-info">{dashboard.student.gender || "-"}</span></p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); updateProfile(); }} className="mb-4">
                  <input
                    type="text"
                    className="form-control form-control-enhanced mb-3"
                    required
                    placeholder="Full Name"
                    value={updatedStudent.studentName || ""}
                    onChange={e => setUpdatedStudent({ ...updatedStudent, studentName: e.target.value })}
                  />
                  <select
                    className="form-select form-control-enhanced mb-3"
                    required
                    value={updatedStudent.gender || ""}
                    onChange={e => setUpdatedStudent({ ...updatedStudent, gender: e.target.value })}
                  >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                  <div className="d-flex justify-content-between gap-2">
                    <button type="submit" className="btn btn-success btn-enhanced flex-fill" disabled={loading.profile}>
                      {loading.profile ? (<><span className="spinner-border spinner-border-sm me-2" />Saving...</>) : "💾 Save Changes"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-enhanced flex-fill"
                      onClick={() => setEditMode(false)}
                      disabled={loading.profile}
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </form>
              )}

              <hr className="my-4" />

              {/* Education */}
              <div className="mb-4">
                <div className="section-header d-flex justify-content-between align-items-center mb-3">
                  <span>🎓 Education</span>
                  {!addingEducation && editingEducationId === null && (
                    <button className="btn btn-sm btn-outline-success btn-enhanced" onClick={() => setAddingEducation(true)}>
                      ➕ Add
                    </button>
                  )}
                </div>
                {addingEducation && (
                  <form onSubmit={e => { e.preventDefault(); addEducation(); }} className="mb-3 p-3" style={{background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%)', borderRadius: '10px'}}>
                    {["level", "institutionName", "board", "grade"].map(field => (
                      <input
                        key={field}
                        type="text"
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                        required={field === "level" || field === "institutionName"}
                        className="form-control form-control-enhanced mb-2"
                        value={newEducation[field]}
                        onChange={e => setNewEducation(prev => ({ ...prev, [field]: e.target.value }))}
                      />
                    ))}
                    <input
                      type="number"
                      placeholder="Passing Year"
                      required
                      min={1900} max={2100}
                      className="form-control form-control-enhanced mb-3"
                      value={newEducation.passingYear}
                      onChange={e => setNewEducation(prev => ({ ...prev, passingYear: e.target.value }))}
                    />
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-sm btn-success btn-enhanced flex-fill" disabled={loading.educationSave}>
                        {loading.educationSave ? (<><span className="spinner-border spinner-border-sm me-2" />Saving...</>) : "💾 Save"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-secondary btn-enhanced flex-fill"
                        onClick={() => {
                          setAddingEducation(false);
                          setNewEducation({ level: "", institutionName: "", board: "", grade: "", passingYear: "" });
                        }}
                        disabled={loading.educationSave}
                      >
                        ❌ Cancel
                      </button>
                    </div>
                  </form>
                )}
                {editingEducationId !== null && (
                  <form onSubmit={e => { e.preventDefault(); saveEditedEducation(); }} className="mb-3 p-3" style={{background: 'linear-gradient(145deg, #fff3cd 0%, #ffeaa7 100%)', borderRadius: '10px'}}>
                    {["level", "institutionName", "board", "grade"].map(field => (
                      <input
                        key={field}
                        type="text"
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                        required={field === "level" || field === "institutionName"}
                        className="form-control form-control-enhanced mb-2"
                        value={editingEducation[field] || ""}
                        onChange={e => setEditingEducation(prev => ({ ...prev, [field]: e.target.value }))}
                      />
                    ))}
                    <input
                      type="number"
                      placeholder="Passing Year"
                      required
                      min={1900} max={2100}
                      className="form-control form-control-enhanced mb-3"
                      value={editingEducation.passingYear || ""}
                      onChange={e => setEditingEducation(prev => ({ ...prev, passingYear: e.target.value }))}
                    />
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-sm btn-success btn-enhanced flex-fill" disabled={loading.educationSave}>
                        {loading.educationSave ? (<><span className="spinner-border spinner-border-sm me-2" />Updating...</>) : "✅ Update"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-secondary btn-enhanced flex-fill"
                        onClick={() => { setEditingEducationId(null); setEditingEducation({}); }}
                        disabled={loading.educationSave}
                      >
                        ❌ Cancel
                      </button>
                    </div>
                  </form>
                )}
                {dashboard.educations.length === 0 && !addingEducation && editingEducationId === null && (
                  <p className="text-muted fst-italic text-center py-3">📚 No education records found.</p>
                )}
                <div className="list-group">
                  {dashboard.educations.map(edu => (
                    <div key={edu.educationId} className="enhanced-list-item list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <div className="flex-grow-1">
                        <h6 className="mb-1 text-primary fw-bold">{edu.level}</h6>
                        <p className="mb-1">{edu.institutionName} ({edu.passingYear})</p>
                        <small className="text-muted">Board: {edu.board || 'N/A'} | Grade: {edu.grade || 'N/A'}</small>
                      </div>
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-primary btn-enhanced" onClick={() => startEditEducation(edu)} disabled={addingEducation || editingEducationId !== null}>
                          ✏️ Edit
                        </button>
                        <button className="btn btn-outline-danger btn-enhanced" onClick={() => deleteEducation(edu.educationId)} disabled={addingEducation || editingEducationId !== null}>
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="my-4" />

              {/* Skills Section */}
              <div>
                <div className="section-header d-flex justify-content-between align-items-center mb-3">
                  <span>🛠️ Skills</span>
                  {!addingSkill && editingSkillId === null && (
                    <button className="btn btn-sm btn-outline-success btn-enhanced" onClick={() => setAddingSkill(true)}>
                      ➕ Add
                    </button>
                  )}
                </div>
                {addingSkill && (
                  <form onSubmit={e => { e.preventDefault(); addSkill(); }} className="mb-3 p-3" style={{background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%)', borderRadius: '10px'}}>
                    <input className="form-control form-control-enhanced mb-3" required placeholder="Enter Skill Name" value={newSkillName} onChange={e => setNewSkillName(e.target.value)} />
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-success btn-enhanced flex-fill" type="submit" disabled={loading.skillSave}>
                        {loading.skillSave ? (<><span className="spinner-border spinner-border-sm me-2" />Saving...</>) : "💾 Save"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-secondary btn-enhanced flex-fill"
                        onClick={() => { setAddingSkill(false); setNewSkillName(""); }}
                        disabled={loading.skillSave}
                      >
                        ❌ Cancel
                      </button>
                    </div>
                  </form>
                )}
                {editingSkillId !== null && (
                  <form onSubmit={e => { e.preventDefault(); saveEditedSkill(); }} className="mb-3 p-3" style={{background: 'linear-gradient(145deg, #fff3cd 0%, #ffeaa7 100%)', borderRadius: '10px'}}>
                    <input className="form-control form-control-enhanced mb-3" required placeholder="Enter Skill Name" value={editingSkillName} onChange={e => setEditingSkillName(e.target.value)} />
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-success btn-enhanced flex-fill" type="submit" disabled={loading.skillSave}>
                        {loading.skillSave ? (<><span className="spinner-border spinner-border-sm me-2" />Updating...</>) : "✅ Update"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-secondary btn-enhanced flex-fill"
                        onClick={() => { setEditingSkillId(null); setEditingSkillName(""); }}
                        disabled={loading.skillSave}
                      >
                        ❌ Cancel
                      </button>
                    </div>
                  </form>
                )}
                {(dashboard.skills?.length ?? 0) === 0 && !addingSkill && editingSkillId === null ? (
                  <p className="text-muted fst-italic text-center py-3">🔧 No skills added yet.</p>
                ) : (
                  <div className="list-group">
                    {dashboard.skills.map(skill => (
                      <div key={skill.skillId} className="enhanced-list-item list-group-item d-flex justify-content-between align-items-center flex-wrap">
                        <span className="fw-semibold text-dark">{skill.skillName}</span>
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-outline-primary btn-enhanced" onClick={() => startEditSkill(skill)} disabled={addingSkill || editingSkillId !== null}>
                            ✏️ Edit
                          </button>
                          <button className="btn btn-outline-danger btn-enhanced" onClick={() => deleteSkill(skill.skillId)} disabled={addingSkill || editingSkillId !== null}>
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-8 col-md-6 d-flex flex-column gap-4">
            {/* Available Internships */}
            <div className="enhanced-card card shadow-sm p-4 flex-grow-1 overflow-auto animate-fade-in" style={{ maxHeight: 320 }}>
              <h5 className="text-success mb-3">💼 Available Internships</h5>
              {(!dashboard.internships || dashboard.internships.length === 0) ? (
                <div className="text-center py-5">
                  <div className="text-muted fs-1 mb-3">📋</div>
                  <p className="text-muted fst-italic">No internships available at the moment.</p>
                </div>
              ) : (
                <div className="list-group">
                  {dashboard.internships.map(job => {
                    const hasApplied = dashboard.applications?.some(app => app.internshipId === job.internshipId);
                    const isDeadlinePassed = job.deadline && new Date(job.deadline) < new Date();

                    const buttonTitle = hasApplied
                      ? "Already applied"
                      : isDeadlinePassed
                        ? "Application deadline has passed"
                        : undefined;

                    const buttonLabel = hasApplied
                      ? "✅ Applied"
                      : isDeadlinePassed
                        ? "⏰ Deadline Passed"
                        : (applyingId === job.internshipId && loading.apply)
                          ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                          : "📝 Apply";

                    return (
                      <div key={job.internshipId} className="enhanced-list-item list-group-item d-flex justify-content-between align-items-center flex-wrap">
                        <div className="flex-grow-1">
                          <h6 className="mb-2 text-primary fw-bold">{job.title}</h6>
                          <div className="row text-sm">
                            <div className="col-md-6">
                              <small className="text-muted d-block">
                                📍 <strong>Location:</strong> {job.location}
                              </small>
                              <small className="text-muted d-block">
                                💻 <strong>Mode:</strong> {job.mode}
                              </small>
                            </div>
                            <div className="col-md-6">
                              {(job.orgName || job.organization?.orgName) && (
                                <small className="text-muted d-block">
                                  🏢 <strong>Organization:</strong> {job.orgName || job.organization?.orgName}
                                </small>
                              )}
                              <small className="text-muted d-block">
                                💰 <strong>Stipend:</strong> {job.stipend ? `${job.stipend}` : "Not specified"}
                              </small>
                              <small className="text-muted d-block">
                                📅 <strong>Deadline:</strong> {job.deadline ? new Date(job.deadline).toLocaleDateString() : "N/A"}
                              </small>
                            </div>
                          </div>
                        </div>
                        <button
                          className={`btn btn-enhanced mt-2 mt-sm-0 ${hasApplied ? 'btn-success' : isDeadlinePassed ? 'btn-secondary' : 'btn-primary'}`}
                          disabled={applyingId === job.internshipId || loading.apply || hasApplied || isDeadlinePassed}
                          onClick={() => { setApplyingId(job.internshipId); applyInternship(job.internshipId); }}
                          aria-label={`Apply for ${job.title}`}
                          title={buttonTitle}
                        >
                          {buttonLabel}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Applications */}
            <div className="enhanced-card card shadow-sm p-4 flex-grow-1 overflow-auto animate-fade-in" style={{ maxHeight: 320 }}>
              <h5 className="text-warning mb-3">📄 My Applications</h5>
              {(!dashboard.applications || dashboard.applications.length === 0) ? (
                <div className="text-center py-5">
                  <div className="text-muted fs-1 mb-3">📝</div>
                  <p className="text-muted fst-italic">No applications submitted yet.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="enhanced-table table table-striped table-hover align-middle mb-0">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Internship Details</th>
                        <th scope="col" className="text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboard.applications.map((app, idx) => {
                        const internship = internshipMap[app.internshipId];
                        return (
                          <tr key={app.applicationId}>
                            <td className="fw-bold text-primary">{idx + 1}</td>
                            <td>
                              <div className="mb-1">
                                <strong className="text-dark">Title:</strong> 
                                <span className="ms-1">{internship?.title || "N/A"}</span>
                              </div>
                              <div>
                                <strong className="text-dark">Description:</strong> 
                                <span className="ms-1 text-muted">{internship?.description || "No description available."}</span>
                              </div>
                            </td>
                            <td className="text-center">
                              <span
                                className={`status-badge ${app.applicationStatusId === 1 ? "status-pending" : "status-accepted"}`}
                                aria-label={app.applicationStatusId === 1 ? "Pending" : "Accepted"}
                              >
                                {app.applicationStatusId === 1 ? "⏳ Pending" : "✅ Accepted"}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Interviews */}
            {/* <div className="enhanced-card card shadow-sm p-4 flex-grow-1 overflow-auto animate-fade-in" style={{ maxHeight: 220 }}>
              <h5 className="text-info mb-3">📅 Interview Schedule</h5>
              {(!interviews || interviews.length === 0) ? (
                <div className="text-center py-4">
                  <div className="text-muted fs-1 mb-3">🗓️</div>
                  <p className="text-muted fst-italic">No interviews scheduled.</p>
                </div>
              ) : (
                <div className="list-group">
                  {interviews.map(i => (
                    <div key={i.interviewId} className="enhanced-list-item list-group-item">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-1">
                            <strong className="text-primary">📅 Date:</strong> 
                            <span className="ms-1">{new Date(i.dateTime).toLocaleString()}</span>
                          </div>
                          <div className="mb-1">
                            <strong className="text-success">📊 Status:</strong> 
                            <span className="ms-1 fw-semibold">{i.status}</span>
                          </div>
                          <div>
                            <strong className="text-muted">🆔 Application ID:</strong> 
                            <span className="ms-1">{i.applicationId}</span>
                          </div>
                        </div>
                        {i.internshipTitle && (
                          <div className="col-md-6">
                            <div className="mb-1">
                              <strong className="text-dark">💼 Internship:</strong> 
                              <span className="ms-1">{i.internshipTitle}</span>
                            </div>
                            <div className="mb-1">
                              <strong className="text-dark">📍 Location:</strong> 
                              <span className="ms-1">{i.internshipLocation}</span>
                            </div>
                            <div>
                              <strong className="text-dark">🏢 Organization:</strong> 
                              <span className="ms-1">{i.organizationName}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div> */}

            {/* Resume Upload */}
            <div className="enhanced-card card shadow-sm p-4 animate-fade-in">
              <div className="upload-area">
                <h5 className="text-primary mb-3">📎 Upload Your Resume</h5>
                <div className="mb-3">
                  <div className="text-muted fs-1 mb-3">📄</div>
                  <input
                    type="file"
                    className="form-control form-control-enhanced w-75 mx-auto"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    aria-label="Upload resume"
                  />
                </div>
                <button
                  className="btn btn-primary btn-enhanced px-2"
                  onClick={uploadResume}
                  disabled={!resumeFile || loading.upload}
                  aria-disabled={!resumeFile || loading.upload}
                >
                  {loading.upload ? (<><span className="spinner-border spinner-border-sm me-2" />Uploading...</>) : "🚀 Upload Resume"}
                </button>
                {resumeFile && (
                  <div className="mt-3 p-2 bg-light rounded">
                    <small className="text-success fw-semibold">
                      ✅ Selected file: {resumeFile.name}
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;