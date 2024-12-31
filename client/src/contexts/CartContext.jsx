import React, { createContext, useContext, useState } from "react";

// Create the context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState();

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the context
export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }

  return context;
};

export { CartProvider, useCartContext };

