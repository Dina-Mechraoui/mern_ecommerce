import React, { createContext, useState } from "react";

// Create the context
const CartContext = createContext();

// CartProvider component
const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}  {/* Ensure that children are properly passed */}
    </CartContext.Provider>
  );
};

// Export CartContext and CartProvider
export { CartContext, CartProvider };
