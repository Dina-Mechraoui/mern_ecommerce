import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from '../Pages/AdminLoginPage';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
    </Routes>
  );
};

export default AdminRoutes;
