import { useState, useEffect } from "react";

const useCart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const addToCart = async (item) => {
        console.log('got here')
        try {
            const response = await fetch("http://localhost:3000/api/cart/addToCart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(item),
            });
            if (!response.ok) {
                throw new Error("Failed to add item to cart");
            }
            const data = await response.json();
            setCart(data.cart);
        } catch (err) {
            setError(err.message);
        }
    };

    const removeFromCart = async (item) => {
        try {
            const response = await fetch("http://localhost:3000/api/cart/removeFromCart", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(item),
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error("Failed to remove item from cart");
            }
            const data = await response.json();
            window.location.reload()
            setCart(data.cart);
        } catch (err) {
            setError(err.message);
        }
    };

    return { cart, addToCart, removeFromCart, loading, error };
};

export default useCart;
