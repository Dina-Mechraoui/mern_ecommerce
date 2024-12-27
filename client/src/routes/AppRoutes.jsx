import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HomePage from '../Pages/HomePage';
import ProductsPage from '../Pages/ProductsPage';
import ScrollToHash from '../components/common/ScrollToHash';
import CartPage from '../Pages/CartPage';
import ProductDetailsPage from '../Pages/ProductDetailsPage';

const AppRoutes = () => {
    const [cartItems, setCartItems] = useState(4)
    return (
    <BrowserRouter>
    <div className="flex flex-col min-h-screen">
    <NavBar cartItems={cartItems}/>
      <ScrollToHash/>
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage cartItems={cartItems}/>} />
        </Routes>
      </main>
      <Footer />
    </div>
    </BrowserRouter>
  );
};



export default AppRoutes;
