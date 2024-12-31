import { useState, useEffect } from "react";

const useCart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log(apiUrl)

    const addToCart = async (item) => {
        try {
            const response = await fetch(`${apiUrl}/api/cart/addToCart`, {
                method: "POST",
                headers: { "Content-Type": "application/json", 
                    // 'Origin': 'https://kl-collection-2bfskr00f-dina-mechraouis-projects.vercel.app' 
                     },

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
            const response = await fetch(`${apiUrl}/api/cart/removeFromCart`, {
                method: "PUT",
                headers: { "Content-Type": "application/json",
                    // 'Origin': 'https://kl-collection-2bfskr00f-dina-mechraouis-projects.vercel.app', 
                    },
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
