import React, { createContext, useState } from "react";

// Create the context
const CartContext = createContext();

// Combined component for the provider and the custom hook
const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;

