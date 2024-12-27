import CartItem from "../components/cart/CartItem";

const CartPage = ({cartItems}) => {
    return ( 
        <div className=" p-3 flex flex-col gap-3 items-center justify-center">
            <CartItem/>
            <CartItem/>
            <CartItem/>
            <CartItem/>
        </div>
     );
}
 
export default CartPage;