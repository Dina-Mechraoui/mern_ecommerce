import React, { useState } from "react";
import ProductCard from "./ProductCard";
import useFetch from '../../hooks/useFetch'

const ProductGrid = ({filters}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { data, loading, error } = useFetch(`${apiUrl}/api/product/getProducts`);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const filteredProducts = data
  ? data.filter((product) => {
      if (filters?.category === "All") {
        return true;
      }
      return product.category === filters?.category;
    })
  : [];

    return ( 
      <div className="grid grid-cols-2 items-center justify-center sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 mb-4 w-full ">
        {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <ProductCard
                  key={index}
                  data={product}
                  />
                ))
            ) : (
                <p className="text-center col-span-full">No products found for the selected filters.</p>
            )}
      </div>
     );
}
 
export default ProductGrid;