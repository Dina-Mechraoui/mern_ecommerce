import { useState, useEffect } from "react";

const ManageOrders = () => {
  const apiUrl = import.meta.env.VITE_API_URL; // Your API base URL
  const adminToken = localStorage.getItem('adminToken')

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      console.log(data.cart)
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders when the component is mounted
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
            <th className="border p-2">Customer Name</th>
            <th className="border p-2">Total Price</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Cart</th>
            <th className="border p-2">Shipping Method</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Region</th>
            <th className="border p-2">Shipping Address</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border p-2">{order.fullName}</td>
              <td className="border p-2">{order.totalPrice} DA</td>
              <td className="border p-2">{order.status || 'Pending'}</td>
              <td className="border p-2">
                {order.cart.map((item, index) => (
                  <div key={index}>
                    <div><strong>{item.name}</strong></div>
                    <div>Size: {item.size}</div>
                    <div>Color: {item.color}</div>
                    <div>Quantity: {item.quantity}</div>
                  </div>
                ))}
              </td>
              <td className="border p-2">{order.shippingMethod}</td>
              <td className="border p-2">{order.phone}</td>
              <td className="border p-2">{order.region}</td>
              <td className="border p-2">{order.shippingAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
