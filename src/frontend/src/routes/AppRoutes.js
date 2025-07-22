import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import RegisterStudent from '../pages/RegisterStudent';
import RegisterOrg from '../pages/RegisterOrg';
import AdminLogin from '../pages/AdminLogin';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-student" element={<RegisterStudent />} />
        <Route path="/register-org" element={<RegisterOrg />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
