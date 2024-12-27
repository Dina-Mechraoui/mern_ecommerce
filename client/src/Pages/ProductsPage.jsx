import { useState } from "react";
import FilterBar from "../components/product/FilterBar";
import ProductGrid from "../components/product/ProductGrid";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SideFilterBar from "../components/product/SideFilterBar";


const ProductsPage = () => {
    const [filter, setFilter] = useState(false)
    const [category, setCategory] = useState("")
    console.log(category)
    return (
        <div className="flex w-full">
            <div className="hidden lg:flex">
                <FilterBar />
            </div>
            <div className="flex flex-col p-3 md:p-14 gap-8  w-full">
                <div className="flex justify-between border-b-2 p-2 border-[#FF8A3E]">
                    <h1 className="text-lg font-bold">Articles</h1>
                    <button onClick={()=>setFilter(!filter)} className="lg:hidden"><FilterAltIcon/></button>
                </div>
                <div className="lg:hidden">
                    {filter && <FilterBar category={category} setCategory={setCategory}/>}
                </div>
                
                <ProductGrid/>
            </div>
        </div>
        
     );
}
 
export default ProductsPage;