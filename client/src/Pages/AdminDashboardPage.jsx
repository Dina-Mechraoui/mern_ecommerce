import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-gray-700">
          Admin Dashboard
        </div>
        <nav className="flex-grow">
          <ul>
            <li>
              <Link
                to="/admin/dashboard"
                className="block px-4 py-2 hover:bg-gray-700"
              >
                Dashboard Home
              </Link>
            </li>
            <li>
              <Link
                to="/admin/products"
                className="block px-4 py-2 hover:bg-gray-700"
              >
                Manage Products
              </Link>
            </li>
            <li>
              <Link
                to="/admin/manageOrders"
                className="block px-4 py-2 hover:bg-gray-700"
              >
                Manage Orders
              </Link>
            </li>
            <li>
              <Link
                to="/admin/settings"
                className="block px-4 py-2 hover:bg-gray-700"
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4">
          <button className="w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cards */}
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-2">Total Products</h2>
            <p className="text-gray-600">You have 120 products.</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-2">Total Orders</h2>
            <p className="text-gray-600">You have 50 pending orders.</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-2">Revenue</h2>
            <p className="text-gray-600">$25,000 this month.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
