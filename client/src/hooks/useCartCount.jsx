import { useState, useEffect } from 'react';

const useCartCount = () => {
  const [cartCount, setCartCount] = useState(() => {
    // Get the cart count from localStorage, or default to 0
    const savedCartCount = localStorage.getItem('cartCount');
    return savedCartCount ? parseInt(savedCartCount) : 0;
  });

  useEffect(() => {
    // Update localStorage whenever cartCount changes
    localStorage.setItem('cartCount', cartCount);
    console.log(localStorage.getItem('cartCount'))
  }, [cartCount]);

  return [cartCount, setCartCount];
};

export default useCartCount;
