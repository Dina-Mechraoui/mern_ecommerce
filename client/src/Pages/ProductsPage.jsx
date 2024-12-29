import { useState } from "react";
import FilterBar from "../components/product/FilterBar";
import ProductGrid from "../components/product/ProductGrid";
import FilterAltIcon from '@mui/icons-material/FilterAlt';


const ProductsPage = () => {
    const [filter, setFilter] = useState(false)
    const [filters, setFilters] = useState({
        category: "All",
      });
      console.log(filters.category)
      const handleFilterChange = (name, value) => {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [name]: value,
        }));
      };
    return (
        <div className="flex w-full">
            <div className="hidden lg:flex">
                <FilterBar filters={filters} onFilterChange={handleFilterChange}/>
            </div>
            <div className="flex flex-col p-3 md:p-14 gap-4  w-full">
                <div className="flex justify-between border-b-2 p-2 border-[#FF8A3E]">
                    <h1 className="text-lg font-bold">Articles</h1>
                    <button onClick={()=>setFilter(!filter)} className="lg:hidden"><FilterAltIcon/></button>
                </div>
                <div className="lg:hidden">
                    {filter && <FilterBar filters={filters} onFilterChange={handleFilterChange}/>}
                </div>
                
                <ProductGrid filters={filters}/>
            </div>
        </div>
        
     );
}
 
export default ProductsPage;