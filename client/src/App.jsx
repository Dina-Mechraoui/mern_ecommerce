import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'; // Main user routes
import AdminRoutes from './routes/AdminRoutes'; // Admin routes

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {/* Both routes are included */}
        <AppRoutes />
        <AdminRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
