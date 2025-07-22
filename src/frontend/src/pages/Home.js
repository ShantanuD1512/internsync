import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <h2>Welcome to InternSync</h2>
      <p>Please select your role to register:</p>
      <div className="d-grid gap-3 col-6 mx-auto">
        <button className="btn btn-primary" onClick={() => navigate('/register-student')}>
          Student Registration
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/register-org')}>
          Organization Registration
        </button>
      </div>
    </div>
  );
};

export default Home;