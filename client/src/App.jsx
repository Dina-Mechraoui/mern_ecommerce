import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'; // Main user routes
import AdminRoutes from './routes/AdminRoutes'; // Admin routes
import Layout from './routes/Layout';
import CartProvider from './contexts/CartContext';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout>
          <AppRoutes />
          <AdminRoutes />
        </Layout>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
