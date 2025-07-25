import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Page components
import Login from '../pages/Login';
import RegisterStudent from '../pages/RegisterStudent';
import RegisterOrg from '../pages/RegisterOrg';
import StudentDashboard from '../components/student/StudentDashboard';
// import OrgDashboard from '../components/org/OrgDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register-student" element={<RegisterStudent />} />
      <Route path="/register-org" element={<RegisterOrg />} />

      {/* Student dashboard */}
      <Route path="/student/dashboard" element={<StudentDashboard />} />

      {/* Redirect any unknown path to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
