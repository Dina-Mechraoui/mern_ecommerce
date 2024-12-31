import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from '../Pages/AdminLoginPage';
import AdminDashboard from '../Pages/AdminDashboardPage';
import AdminProductsPage from '../Pages/AdminProductsPage';
import AddProductPage from '../Pages/AddproductPage';
import ManageOrders from '../Pages/ManageOrders';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path='/admin/products' element={<AdminProductsPage/>}/>
      <Route path='/admin/addProduct' element={<AddProductPage/>}/>
      <Route path='/admin/manageOrders' element={<ManageOrders/>}/>
    </Routes>
  );
};

export default AdminRoutes;
