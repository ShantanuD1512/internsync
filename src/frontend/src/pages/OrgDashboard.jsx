import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchInternshipsByOrgId, fetchOrganizationIdByUserId } from '../api/api';
import './orgDashboard.css'; // Keep the custom styles from before

const OrgDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state;

  const [orgId, setOrgId] = useState(null); // State for organization ID
  const [internshipIds, setInternshipIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternships = async () => {
      setLoading(true);
      try {
        const fetchedOrgId = await fetchOrganizationIdByUserId(user.userId);
        setOrgId(fetchedOrgId);

        const data = await fetchInternshipsByOrgId(fetchedOrgId);
        if (data && data.length > 0) {
          const ids = data.map(i => i.internshipId);
          setInternshipIds(ids);
        } else {
          setInternshipIds([]);
        }
      } catch (err) {
        // You can add error handling here
        setInternshipIds([]);
      }
      setLoading(false);
    };
    if (user?.userId) fetchInternships();
  }, [user]);

  const handleLogout = () => {
    navigate('/');
  };

  const handleNavigate = (path) => {
    navigate(path, { state: user });
  };

  return (
    <div className="dashboard-bg min-vh-100 py-5">
      <div className="container">
        {/* User Welcome Card */}
        <div className="card dashboard-card mb-5 animate__animated animate__fadeInDown">
          <div className="card-body d-flex align-items-center">
            <img
              src={`https://ui-avatars.com/api/?name=${user?.name || 'Org'}&background=random`}
              alt="avatar"
              className="rounded-circle me-4 shadow avatar-img"
              width="80"
              height="80"
            />
            <div>
              <h2 className="gradient-text mb-1">
                Welcome, <span className="fw-bold">{user?.name || 'Org'}</span>
              </h2>
              <small className="text-muted">
                Organization ID: <span className="fw-bold">{orgId || 'Loading...'}</span>
              </small>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Post Internship */}
          <div className="col-12 col-md-6">
            <div
              className="card dashboard-card h-100 text-center shadow-sm cursor-pointer"
              onClick={() => handleNavigate('/org/post-internship')}
              role="button"
              tabIndex={0}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleNavigate('/org/post-internship')}
            >
              <div className="card-body d-flex flex-column justify-content-center">
                <i className="bi bi-plus-circle-fill display-4 text-primary mb-3" />
                <h5 className="card-title">Post Internship</h5>
                <p className="card-text text-muted">Create a new internship post to attract applicants.</p>
                <button className="btn btn-primary mt-auto">Go</button>
              </div>
            </div>
          </div>

          {/* View Posted Internships */}
          <div className="col-12 col-md-6">
            <div
              className="card dashboard-card h-100 text-center shadow-sm cursor-pointer"
              onClick={() => handleNavigate('/posted-internships')}
              role="button"
              tabIndex={0}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleNavigate('/posted-internships')}
            >
              <div className="card-body d-flex flex-column justify-content-center">
                <i className="bi bi-card-list display-4 text-secondary mb-3" />
                <h5 className="card-title">View Posted Internships</h5>
                <p className="card-text text-muted">Browse your existing internship posts.</p>
                <button className="btn btn-secondary mt-auto">Go</button>
              </div>
            </div>
          </div>

          {/* View Applicants */}
          <div className="col-12 col-md-6">
            <div
              className={`card dashboard-card h-100 text-center shadow-sm ${loading ? 'disabled-card' : 'cursor-pointer'}`}
              onClick={() => !loading && navigate('/applicants', { state: { internshipIds } })}
              role="button"
              tabIndex={loading ? -1 : 0}
              onKeyDown={e => {
                if (!loading && (e.key === 'Enter' || e.key === ' ')) {
                  navigate('/applicants', { state: { internshipIds } });
                }
              }}
            >
              <div className="card-body d-flex flex-column justify-content-center">
                <i className="bi bi-people-fill display-4 text-info mb-3" />
                <h5 className="card-title">View Applicants</h5>
                <p className="card-text text-muted">See who applied to your internships.</p>
                <button className="btn btn-info mt-auto" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                      Loading...
                    </>
                  ) : (
                    "Go"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Schedule Interview */}
          <div className="col-12 col-md-6">
            <div
              className="card dashboard-card h-100 text-center shadow-sm cursor-pointer"
              onClick={() => handleNavigate('/org/scheduled-interviews')}
              role="button"
              tabIndex={0}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleNavigate('/org/scheduled-interviews')}
            >
              <div className="card-body d-flex flex-column justify-content-center">
                <i className="bi bi-calendar2-check-fill display-4 text-warning mb-3" />
                <h5 className="card-title">Schedule Interview</h5>
                <p className="card-text text-muted">Arrange interviews with selected candidates.</p>
                <button className="btn btn-warning mt-auto">Go</button>
              </div>
            </div>
          </div>

          {/* Edit Profile */}
          <div className="col-12 col-md-6">
            <div
              className="card dashboard-card h-100 text-center shadow-sm cursor-pointer"
              onClick={() => handleNavigate('/edit-profile')}
              role="button"
              tabIndex={0}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleNavigate('/edit-profile')}
            >
              <div className="card-body d-flex flex-column justify-content-center">
                <i className="bi bi-pencil-square display-4 text-dark mb-3" />
                <h5 className="card-title">Edit Profile</h5>
                <p className="card-text text-muted">Update your organization’s details.</p>
                <button className="btn btn-outline-dark mt-auto">Go</button>
              </div>
            </div>
          </div>

          {/* Logout */}
          <div className="col-12 col-md-6">
            <div
              className="card dashboard-card h-100 text-center shadow-sm cursor-pointer"
              onClick={handleLogout}
              role="button"
              tabIndex={0}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleLogout()}
            >
              <div className="card-body d-flex flex-column justify-content-center">
                <i className="bi bi-box-arrow-right display-4 text-danger mb-3" />
                <h5 className="card-title">Logout</h5>
                <p className="card-text text-muted">Sign out of your account securely.</p>
                <button className="btn btn-danger mt-auto">Logout</button>
              </div>
            </div>
          </div>
        </div>

        {!loading && internshipIds.length === 0 && (
          <div className="alert alert-warning d-flex align-items-center mt-4">
            <i className="bi bi-exclamation-triangle me-2" />
            No internships found for this organization.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrgDashboard;
