import { useState } from 'react';
import Button from '../common/Button';

const FeaturedProduct = ({data}) => {
    const [outOfStock, setOutOfStock] = useState(false);
    const [promo, setPromo] = useState(true);

    return (
        <div className="flex flex-col md:flex-row gap-8 md:w-full justify-center lg:gap-24">
            <h2 className=" md:hidden text-4xl font-bold self-center text-gray-800 mb-6">Latest Product</h2>
            <a href={`/${data._id}`}>
            <div className={`relative md:max-w-72 w-full rounded-md lg:mb-0 ${outOfStock ? 'bg-gray-300' : ''}`}>
                <img
                    className={`h-full w-full object-cover rounded-md ${outOfStock ? 'opacity-50' : ''}`}
                    src={data.images[0]}
                    alt="Product"
                />
                {outOfStock && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 rounded-md">
                        <h1 className="text-white text-lg font-bold">Out of Stock</h1>   
                    </div>
                )}
            </div>
            </a>
            
            <div className=" flex flex-col justify-between">
                <div>
                    <h2 className="hidden md:block text-4xl font-bold text-gray-800 mb-6 pb-4 border-b-4 border-[#FF8A3E]">Latest Product</h2>
                    <h2 className="text-2xl font-semibold mb-2">{data.name}</h2>
                    <p className="text-md max-w-80 text-gray-600 mb-8">{data.description}</p>
                </div>
                <div className='self-end'>
                    <div className="flex flex-col mb-2">
                        {promo && (
                            <span className="self-end font-bold text-red-500 text-lg">New Price</span>
                        )}
                        <span className={`self-end ${promo ? 'line-through text-sm' : 'font-bold text-xl'}`}>
                            {data.price} dzd
                        </span>
                    </div>
                    <a href={`/${data._id}`}><Button text="SHOP NOW"/></a>
                </div>
                    
                    
            </div>
        </div>
    );
};

export default FeaturedProduct;
