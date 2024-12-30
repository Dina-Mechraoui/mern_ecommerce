import CartItem from "../components/cart/CartItem";
import useFetch from "../hooks/useFetch";
import Button from "../components/common/Button"
import {useState} from 'react'
import OrderPopup from "../components/cart/OrderForm";

const CartPage = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { data, loading, error } = useFetch(`${apiUrl}/api/cart/getCart`);
    const [popup, openPopup] = useState(false)

    const proceedWithOrder = () => {
        openPopup(!popup)
    };
    
    if (loading) {
        return <div className="flex items-center justify-center h-screen text-xl font-semibold">Loading...</div>;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen text-xl font-semibold text-red-600">
                Error: {error.message}
            </div>
        );
    }

    if (!data || data.cart.length === 0) {
        return (
        <div className="p-6 mx-auto max-w-3xl">
            <h2 className="lg:text-lg text-md font-semibold text-gray-800 mb-6 pb-3 border-b-2 border-[#FF8A3E]">Your Shopping Cart</h2>
            <div className="flex text-sm text-gray-500 justify-center ">
                Your cart is empty.
            </div>
        </div>
        );
    }

    const calculateTotalPrice = () => {
        return data.cart.reduce((total, item) => {
            console.log(item)
            return total + (item.quantity * item.price);
        }, 0);
    };
    
      const totalPrice = calculateTotalPrice();
      console.log(totalPrice)
    return (
        <div className="p-6 mx-auto max-w-3xl">
            <h2 className="lg:text-lg text-md  font-semibold text-gray-800 mb-6 pb-3 border-b-2 border-[#FF8A3E]">Your Shopping Cart</h2>
            <div className="flex flex-col gap-4">
                {data.cart.map((item, index) => (
                    <CartItem
                        key={index}
                        cartItem={item}
                    />
                ))}
            </div>
            <div className="mt-6 flex justify-end items-center">
                <Button text='Proceed with order' py='py-2' px='px-3' onclick={proceedWithOrder}/>
            </div>
            {popup && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50">
                    <div className="bg-white flex items-start justify-center rounded-md shadow-md">
                        <OrderPopup cartItems={data.cart} price={totalPrice} onClose={proceedWithOrder}/>
                    </div>
                </div>
            )}

        </div>
    );
};

export default CartPage;
