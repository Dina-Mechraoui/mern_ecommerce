import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'; // Main user routes
import AdminRoutes from './routes/AdminRoutes'; // Admin routes
import Layout from './routes/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
        <AdminRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
