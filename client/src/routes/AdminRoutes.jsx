import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from '../Pages/AdminLoginPage';
import AdminDashboard from '../Pages/AdminDashboardPage';
import AdminProductsPage from '../Pages/AdminProductsPage';
import AddProductPage from '../Pages/AddproductPage';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path='/admin/products' element={<AdminProductsPage/>}/>
      <Route path='/admin/addProduct' element={<AddProductPage/>}/>
    </Routes>
  );
};

export default AdminRoutes;
