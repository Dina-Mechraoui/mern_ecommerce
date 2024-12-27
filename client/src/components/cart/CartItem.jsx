import test from '../../assets/test.png'
const CartItem = ({image, size, color, quantity, price}) => {
    return ( 
        <div className="flex flex-wrap items-center space-x-4 border-2 p-2 w-full sm:w-2/3 rounded-md ">
            <img
                src={test}
                className="h-16 w-16 sm:w-24 sm:h-24 object-cover rounded"
            />
            <div className='flex flex-col space-y-2'>
                <div>
                    <h2 className="font-semibold text-sm md:text-md">item's name </h2>
                    <p className='text-xs md:text-sm'>
                    XL / RED
                    </p>
                </div>
                <div className="flex space-x-2 items-center">
                    <input
                        type="number"
                        min="1"
                        className="border px-1 py-1 w-16 rounded"
                    />
                    <p className="font-semibold text-sm">
                        x price
                    </p>
                    <p className='justify-self-end'>final price</p>

                </div>
            </div>
        </div>
    );
}
 
export default CartItem;