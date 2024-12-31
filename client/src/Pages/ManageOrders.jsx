import { useState, useEffect } from "react";

const ManageOrders = () => {
  const apiUrl = import.meta.env.VITE_API_URL; // Your API base URL

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const adminToken = localStorage.getItem('adminToken');

  // Fetch orders from the API
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/order/getOrders`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;
  if (orders.length === 0) return <div>No orders found.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Customer Name</th>
            <th className="border p-2">Total Price</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border p-2">{order._id}</td>
              <td className="border p-2">{order.fullName}</td>
              <td className="border p-2">{order.totalPrice} DA</td>
              <td className="border p-2">{order.status || 'Pending'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
