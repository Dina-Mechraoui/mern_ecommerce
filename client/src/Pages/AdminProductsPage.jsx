import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state
  const apiUrl = import.meta.env.VITE_API_URL;
  // Fetch products from the backend using fetch
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Replace this URL with your actual API endpoint
        const response = await fetch('${apiUrl}/api/product/getProducts');
        
        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);  // Set products to the fetched data
        setLoading(false);   // Set loading to false once data is fetched
      } catch (err) {
        setError('Error fetching products');  // Set error message if fetch fails
        setLoading(false);  // Stop loading even if there's an error
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // If loading, show a loading message
  if (loading) {
    return <div>Loading products...</div>;
  }

  // If error, show an error message
  if (error) {
    return <div>{error}</div>;
  }

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
                <tr key={product._id} className="hover:bg-gray-100">
                  <td className="border p-2">{product._id}</td>
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
