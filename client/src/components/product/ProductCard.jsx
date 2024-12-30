import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from 'react';
import Button from '../common/Button';

const ProductCard = ({data}) => {
    const [outOfStock, setOutOfStock] = useState(false)
    const [promo, setPromo] = useState(false)

    return (
        <a href={`/${data._id}`}>
            <div className="border rounded-lg shadow-md bg-white p-3 sm:p-4 max-w-64">
                <div className={`relative rounded-md mb-4 ${outOfStock ? 'bg-gray-300' : ''}`}>
                <img
                    className={` rounded-md ${outOfStock ? 'opacity-50' : ''}`}
                    src={data.images[0]}
                    alt="Product"
                />
                {outOfStock && (
                    <div className="absolute top-0 w-full h-full flex items-center justify-center bg-black opacity-50 rounded-md">
                        <h1 className='text-white'>Out of Stock</h1>
                    </div>
                )}
            </div>

                <h2 className="text-sm font-semibold mb-2">{data.name}</h2>
                <p className="text-sm text-gray-600 mb-2">{data.description}</p>
                <div className="flex items-center justify-between">
                    <div className='flex flex-col'>
                        {promo && 
                            <span className='font-bold text-red-500 text-sm'>new price</span>
                        }
                        <span className={`${promo ? `line-through text-xs` : ` font-bold text-sm`} `}>{data.price} DA</span>
                    </div>
                    <Button text='check' px='px-4' py='py-1'/>
                </div>
            </div>
        </a>
        
     );
}

export default ProductCard;