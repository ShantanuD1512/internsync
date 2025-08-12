import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import "./ViewApplicants.css";

const ViewApplicants = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orgUser = location.state;

  const internshipIds = useMemo(
    () => location.state?.internshipIds || [],
    [location.state]
  );

  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [educationFilter, setEducationFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [internshipTitleFilter, setInternshipTitleFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    applicationId: "",
    interviewDateTime: "",
    mode: "Online",
    instructions: "",
    interviewStatusId: 4,
  });

  useEffect(() => {
    if (!internshipIds || internshipIds.length === 0) {
      setError("No internships found for your organization.");
      setApplications([]);
      return;
    }
    setLoading(true);

    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/applications/internships/with-title",
          {
            params: { internshipIds },
            paramsSerializer: (params) =>
              qs.stringify(params, { arrayFormat: "repeat" }),
          }
        );

        const withDetails = await Promise.all(
          data.map(async (app) => {
            const studentId = app.student?.studentId || app.studentId;
            const studentName =
              app.student?.studentName || app.studentName || "N/A";

            if (studentId) {
              try {
                const res = await axios.get(
                  `http://localhost:8080/students/${studentId}/dashboard`
                );
                return {
                  ...app,
                  student: {
                    studentId,
                    studentName,
                    educations: res.data.educations || [],
                    skills: res.data.skills || [],
                  },
                };
              } catch {
                return {
                  ...app,
                  student: {
                    studentId,
                    studentName,
                    educations: [],
                    skills: [],
                  },
                };
              }
            }
            return app;
          })
        );

        setApplications(withDetails);
        setError("");
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Error loading applications.");
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [internshipIds]);

  useEffect(() => {
    let filtered = [...applications];

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((app) =>
        app.student?.studentName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (educationFilter.trim() !== "") {
      filtered = filtered.filter((app) =>
        app.student?.educations?.some(
          (edu) =>
            edu.level &&
            edu.level.toLowerCase().includes(educationFilter.toLowerCase())
        )
      );
    }

    if (skillFilter.trim() !== "") {
      filtered = filtered.filter((app) =>
        app.student?.skills?.some(
          (skill) =>
            skill.skillName &&
            skill.skillName.toLowerCase().includes(skillFilter.toLowerCase())
        )
      );
    }

    if (internshipTitleFilter.trim() !== "") {
      filtered = filtered.filter((app) =>
        (app.internshipTitle || app.internship?.internshipTitle || "")
          .toLowerCase()
          .includes(internshipTitleFilter.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.appliedOn);
      const dateB = new Date(b.appliedOn);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredApps(filtered);
  }, [
    applications,
    searchTerm,
    educationFilter,
    skillFilter,
    internshipTitleFilter,
    sortOrder,
  ]);

  // Updated: Modal Handlers
  function handleModalChange(e) {
    const { name, value } = e.target;
    setModalData((prev) => ({ ...prev, [name]: value }));
  }

  function openCreateModal() {
    setModalData({
      applicationId: "",
      interviewDateTime: "",
      mode: "Online",
      instructions: "",
      interviewStatusId: 4,
    });
    setShowModal(true);
  }

  async function handleModalSubmit() {
    try {
      if (!modalData.applicationId || !modalData.interviewDateTime) {
        alert("Please select an application and enter a date/time");
        return;
      }

      const payload = {
        ...modalData,
        interviewDateTime: new Date(
          modalData.interviewDateTime
        ).toISOString(),
      };

      await axios.post("http://localhost:8080/api/org/interviews", payload);
      alert("Interview scheduled successfully ✅");
      setShowModal(false);
    } catch (err) {
      console.error("Error scheduling interview:", err);
      alert("Error: " + (err.response?.data || err.message));
    }
  }

  const handleBack = () => {
    navigate("/org-dashboard", { state: orgUser });
  };

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={handleBack} style={styles.backButton}>
          ← Back
        </button>
        <h2 style={styles.heading}>📋 View All Applicants</h2>
      </div>

      {/* Action Button */}
      <div className="text-end mb-3">
        <button className="btn btn-success shadow" onClick={openCreateModal}>
          ➕ Schedule New Interview
        </button>
      </div>

      {/* Filters */}
      <div className="card p-3 shadow-sm mb-4">
        <h5 className="mb-3">🔍 Filter Applications</h5>
        <div className="row g-3">
          <div className="col-md">
            <input
              type="text"
              placeholder="Search by Student Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md">
            <input
              type="text"
              placeholder="Filter by Education"
              value={educationFilter}
              onChange={(e) => setEducationFilter(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md">
            <input
              type="text"
              placeholder="Filter by Skill"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md">
            <input
              type="text"
              placeholder="Filter by Internship Title"
              value={internshipTitleFilter}
              onChange={(e) => setInternshipTitleFilter(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="form-select"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Display */}
      {loading && <div className="alert alert-info">Loading applications...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && filteredApps.length === 0 && (
        <div className="alert alert-warning">
          No applications found matching your criteria.
        </div>
      )}

      {/* Cards Layout */}
      <div className="row">
        {filteredApps.map((app) => (
          <div className="col-md-6 col-lg-4 mb-4" key={app.applicationId}>
            <div className="card shadow-sm h-100 border-primary">
              <div className="card-body">
                <h5 className="card-title text-primary">
                  {app.student?.studentName || app.studentName || "N/A"}
                </h5>
                <p className="card-text">
                  <b>Internship:</b> {app.internshipTitle || "N/A"}
                  <br />
                  <b>Applied On:</b>{" "}
                  {new Date(app.appliedOn).toLocaleDateString()}
                </p>

                <h6 className="text-secondary">🎓 Education</h6>
                {app.student?.educations?.length > 0 ? (
                  <ul className="small">
                    {app.student.educations.map((edu, i) => (
                      <li key={i}>
                        <b>{edu.level}</b> at {edu.institutionName} ({edu.passingYear})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted small">No education records.</p>
                )}

                <h6 className="text-secondary">🛠 Skills</h6>
                {app.student?.skills?.length > 0 ? (
                  <div className="d-flex flex-wrap gap-2">
                    {app.student.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="badge bg-light text-dark border"
                      >
                        {skill.skillName}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted small">No skills listed.</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Updated Modal */}
      {showModal && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050,
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
            }}
          >
            <h5>Schedule New Interview</h5>

            <div className="mb-3">
              <label htmlFor="applicationId" className="form-label">
                Application
              </label>
              <select
                id="applicationId"
                name="applicationId"
                className="form-select"
                value={modalData.applicationId}
                onChange={handleModalChange}
                required
              >
                <option value="">Select Application</option>
                {applications.map((app) => (
                  <option key={app.applicationId} value={app.applicationId}>
                    Appl. #{app.applicationId} — {app.student?.studentName || "N/A"}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="interviewDateTime" className="form-label">
                Interview Date & Time
              </label>
              <input
                type="datetime-local"
                id="interviewDateTime"
                name="interviewDateTime"
                className="form-control"
                value={modalData.interviewDateTime}
                onChange={handleModalChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="mode" className="form-label">
                Mode
              </label>
              <select
                id="mode"
                name="mode"
                className="form-select"
                value={modalData.mode}
                onChange={handleModalChange}
              >
                <option value="Online">Online</option>
                <option value="In-person">In-person</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="instructions" className="form-label">
                Instructions
              </label>
              <textarea
                id="instructions"
                name="instructions"
                className="form-control"
                value={modalData.instructions}
                onChange={handleModalChange}
                rows={3}
              />
            </div>

            <div className="d-flex justify-content-between">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleModalSubmit}>
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    padding: "20px",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: "20px",
  },
  backButton: {
    position: "absolute",
    left: 0,
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  heading: {
    fontSize: "26px",
    fontWeight: "bold",
    margin: 0,
    color: "#2c3e50",
  },
};

export default ViewApplicants;
