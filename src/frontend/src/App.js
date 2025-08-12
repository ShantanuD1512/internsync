import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrgDashboard from './pages/OrgDashboard';
// import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PostInternshipPage from './pages/PostInternshipPage';
import ViewPostedInternships from './pages/ViewPostedInternships';
import EditProfile from './pages/EditProfile'; // or correct relative path
import ViewApplicants from './pages/ViewApplicants';
import ScheduleInterviews from './pages/ScheduleInterviews';
import "bootstrap/dist/css/bootstrap.min.css";
import OrgScheduleInterviews from './pages/OrgScheduleInterviews';

import RegisterStudentPage from './pages/RegisterStudentPage';

import StudentDashboard from './pages/StudentDashboard';
import LandingPage from './pages/LandingPage';


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/org-dashboard" element={<OrgDashboard />} />
      {/* <Route path="/student-dashboard" element={<StudentDashboard />} /> */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/org/post-internship" element={<PostInternshipPage />} />
      <Route path="/posted-internships" element={<ViewPostedInternships />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/applicants" element={<ViewApplicants />} />
      <Route path="/schedule-interview" element={<ScheduleInterviews />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />

      <Route path="/org/scheduled-interviews" element={<OrgScheduleInterviews />} />

      <Route path="/register-student" element={<RegisterStudentPage />} />

    </Routes>
  </Router>
);

export default App;
