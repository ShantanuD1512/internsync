import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <span className="navbar-brand fw-bold text-primary">
            🌐 InternSync
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navMenu">
            <ul className="navbar-nav gap-3">
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={() => navigate('/')}>Home</button>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link">About</button>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link">Contact</button>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-primary" onClick={() => navigate('/login')}>Login</button>
              </li>
              <li className="nav-item">
                <button className="btn btn-primary" onClick={() => navigate('/register')}>Register</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 text-center text-lg-start">
              <h1 className="display-5 fw-bold">Find Internships<br />That Launch Careers</h1>
              <p className="lead mt-3">
                InternSync connects you to verified internships that build real-world skills.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-4 justify-content-center justify-content-lg-start">
                <button
                  className="btn btn-outline-dark"
                  onClick={() => navigate('/register-student')}
                >
                  🎓 Register as Student
                </button>
                <button
                  className="btn btn-dark"
                  onClick={() => navigate('/register')}
                >
                  🏢 Register as Org
                </button>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <img
                src="https://cdn.pixabay.com/photo/2016/03/31/20/11/working-1294930_960_720.png"
                alt="Hero Illustration"
                className="img-fluid rounded-4"
                style={{ maxHeight: '300px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-5 bg-white border-top">
        <div className="container text-center">
          <h2 className="mb-4">Why Choose InternSync?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 border rounded-4 shadow-sm h-100">
                <h4 className="text-success">✅ Verified Companies</h4>
                <p className="text-muted">We partner only with legitimate and reviewed organizations.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded-4 shadow-sm h-100">
                <h4 className="text-primary">📂 Smart Tracking</h4>
                <p className="text-muted">Track your internship applications in one dashboard.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded-4 shadow-sm h-100">
                <h4 className="text-info">📝 Resume & Docs</h4>
                <p className="text-muted">Easily upload and manage all your internship documents.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-light text-center py-3 border-top">
        <div className="container">
          <div className="mb-1">
            📞 Contact | <a href="#">Terms</a>
          </div>
          <small>© 2025 InternSync</small>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
