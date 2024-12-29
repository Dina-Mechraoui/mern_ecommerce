
import useFetch from '../../hooks/useFetch';
import useCart from "../../hooks/useCart"
import CloseIcon from '@mui/icons-material/Close';
const CartItem = ({cartItem}) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const {data, loading, error} = useFetch(`${apiUrl}/api/product/getProduct/${cartItem.productId}`);
    const {removeFromCart} = useCart()
    const handleClick = ()=>{
        console.log('here')
        const item = {
            productId: cartItem.productId,
            size: cartItem.size,
            color: cartItem.color,
        } 
        console.log('here') 
        removeFromCart(item)
        

    }
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
                <div className='flex flex-col w-full'>
                    <div className='flex items-end w-full justify-between'>
                        <a href={`/${cartItem.productId}`}><h2 className="font-semibold  text-sm md:text-md">{data.name}</h2></a>
                        <button onClick={()=>handleClick()}><CloseIcon sx={{fontSize:"18px"}}/></button>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <p className="text-xs md:text-sm">
                            Size: {cartItem.size}
                        </p>
                        <p className="text-xs md:text-sm flex items-center">
                            Color:
                            <span
                                className="inline-block h-4 w-4 border-2 border-black rounded-full ml-2"
                                style={{ backgroundColor: cartItem.color }}
                            ></span>
                        </p>
                    </div>

                    <div className="flex items-end w-full justify-between">
                        <p className=" text-xs">
                            {cartItem.quantity} x {data.price}DA
                        </p>
                        <p className='font-semibold text-sm'> total : { data.price* cartItem.quantity}DA</p>

                    </div>
                </div>
            </div>
    );
}
 
export default CartItem;