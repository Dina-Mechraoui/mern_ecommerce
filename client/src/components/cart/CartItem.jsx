import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import CloseIcon from '@mui/icons-material/Close';

const CartItem = ({ cartItem }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { data, loading, error } = useFetch(`${apiUrl}/api/product/getProduct/${cartItem.productId}`);
  
  // Function to handle removal from localStorage
  const handleRemoveFromCart = () => {
    // Get the current cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

    // Remove the item from the cart
    const updatedCart = storedCart.filter(
      (item) =>
        item.productId !== cartItem.productId ||
        item.size !== cartItem.size ||
        item.color !== cartItem.color
    );

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Optionally trigger a re-render if you want to update the UI immediately
    window.location.reload();  // This reloads the page to reflect the updated cart
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No product found.</div>;
  }

  return (
    <div className="flex items-center space-x-4 border-2 p-2 w-full rounded-md">
      <img
        src={data.images[0]}
        className="h-16 w-16 object-cover rounded"
      />
      <div className="flex flex-col w-full">
        <div className="flex items-end w-full justify-between">
          <a href={`/${cartItem.productId}`}>
            <h2 className="font-semibold text-sm md:text-md">{data.name}</h2>
          </a>
          <button onClick={handleRemoveFromCart}>
            <CloseIcon sx={{ fontSize: '18px' }} />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-xs md:text-sm">Size: {cartItem.size}</p>
          <p className="text-xs md:text-sm flex items-center">
            Color:
            <span
              className="inline-block h-4 w-4 border-2 border-black rounded-full ml-2"
              style={{ backgroundColor: cartItem.color }}
            ></span>
          </p>
        </div>

        <div className="flex items-end w-full justify-between">
          <p className="text-xs">
            {cartItem.quantity} x {data.price}DA
          </p>
          <p className="font-semibold text-sm">
            total: {data.price * cartItem.quantity}DA
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
