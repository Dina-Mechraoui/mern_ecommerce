import React from 'react';
import { Link } from 'react-router-dom';

const AdminProductsPage = () => {
  const products = [
    {
      id: 1,
      name: 'Product A',
      price: 100,
      stock: [
        { size: 'S', quantity: 10, color: 'Red' },
        { size: 'M', quantity: 5, color: 'Blue' },
      ],
    },
    {
      id: 2,
      name: 'Product B',
      price: 200,
      stock: [
        { size: 'L', quantity: 7, color: 'Green' },
        { size: 'XL', quantity: 3, color: 'Black' },
      ],
    },
    {
      id: 3,
      name: 'Product C',
      price: 300,
      stock: [
        { size: 'M', quantity: 15, color: 'Yellow' },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col">
        <div className="p-4 text-xl font-bold border-b">
          Admin Dashboard
        </div>
        <nav className="flex-grow">
          <ul>
            <li>
              <Link
                to="/admin/dashboard"
                className="block px-4 py-2"
              >
                Dashboard Home
              </Link>
            </li>
            <li>
              <Link
                to="/admin/products"
                className="block px-4 py-2"
              >
                Manage Products
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orders"
                className="block px-4 py-2"
              >
                Manage Orders
              </Link>
            </li>
            <li>
              <Link
                to="/admin/settings"
                className="block px-4 py-2"
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
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

        {/* Add Product Button */}
        <div className="mb-4">
          <Link to="/admin/addProduct">
            <button className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded">
              Add Product
            </button>
          </Link>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Stock</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-100">
                  <td className="border p-2">{product.id}</td>
                  <td className="border p-2">{product.name}</td>
                  <td className="border p-2">${product.price}</td>
                  <td className="border p-2">
                    <ul>
                      {product.stock.map((item, index) => (
                        <li key={index}>
                          Size: {item.size}, Quantity: {item.quantity}, Color: 
                          <span 
                            className="inline-block ml-2 w-4 h-4 rounded-full" 
                            style={{ backgroundColor: item.color.toLowerCase() }}
                          />
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border p-2">
                    <button className="bg-green-500 hover:bg-green-400 text-white py-1 px-2 rounded mr-2">
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-400 text-white py-1 px-2 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProductsPage;
