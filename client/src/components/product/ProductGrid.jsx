import React, { useState } from "react";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ProductCard from "./ProductCard";
import test from '../../assets/test.png'
import useFetch from '../../hooks/useFetch'

const ProductGrid = () => {
  const mockProducts = [
    {
      name: 'Elegant Evening Gown',
      price: 120.99,
      description: 'A stunning evening gown with intricate embroidery.',
      category: 'robe',
      stock: [
        { size: 'S', color: 'Red', quantity: 10 },
        { size: 'M', color: 'Red', quantity: 5 },
        { size: 'L', color: 'Blue', quantity: 8 },
      ],
      images: [
        test,
        'https://example.com/images/elegant-evening-gown-front.jpg',
        'https://example.com/images/elegant-evening-gown-back.jpg',
      ],
      promotion: {
        discountPercentage: 15,
        startDate: new Date('2024-12-01'),
        endDate: new Date('2024-12-15'),
      },
    },
    {
      name: 'Elegant Evening Gown',
      price: 120.99,
      description: 'A stunning evening gown with intricate embroidery.',
      category: 'robe',
      stock: [
        { size: 'S', color: 'Red', quantity: 10 },
        { size: 'M', color: 'Red', quantity: 5 },
        { size: 'L', color: 'Blue', quantity: 8 },
      ],
      images: [
        test,
        'https://example.com/images/elegant-evening-gown-front.jpg',
        'https://example.com/images/elegant-evening-gown-back.jpg',
      ],
      promotion: {
        discountPercentage: 15,
        startDate: new Date('2024-12-01'),
        endDate: new Date('2024-12-15'),
      },
    },
    {
      name: 'Elegant Evening Gown',
      price: 120.99,
      description: 'A stunning evening gown with intricate embroidery.',
      category: 'robe',
      stock: [
        { size: 'S', color: 'Red', quantity: 10 },
        { size: 'M', color: 'Red', quantity: 5 },
        { size: 'L', color: 'Blue', quantity: 8 },
      ],
      images: [
        test,
        'https://example.com/images/elegant-evening-gown-front.jpg',
        'https://example.com/images/elegant-evening-gown-back.jpg',
      ],
      promotion: {
        discountPercentage: 15,
        startDate: new Date('2024-12-01'),
        endDate: new Date('2024-12-15'),
      },
    },
    {
      name: 'Elegant Evening Gown',
      price: 120.99,
      description: 'A stunning evening gown with intricate embroidery.',
      category: 'robe',
      stock: [
        { size: 'S', color: 'Red', quantity: 10 },
        { size: 'M', color: 'Red', quantity: 5 },
        { size: 'L', color: 'Blue', quantity: 8 },
      ],
      images: [
        test,
        'https://example.com/images/elegant-evening-gown-front.jpg',
        'https://example.com/images/elegant-evening-gown-back.jpg',
      ],
      promotion: {
        discountPercentage: 15,
        startDate: new Date('2024-12-01'),
        endDate: new Date('2024-12-15'),
      },
    },
    {
      name: 'Elegant Evening Gown',
      price: 120.99,
      description: 'A stunning evening gown with intricate embroidery.',
      category: 'robe',
      stock: [
        { size: 'S', color: 'Red', quantity: 10 },
        { size: 'M', color: 'Red', quantity: 5 },
        { size: 'L', color: 'Blue', quantity: 8 },
      ],
      images: [
        test,
        'https://example.com/images/elegant-evening-gown-front.jpg',
        'https://example.com/images/elegant-evening-gown-back.jpg',
      ],
      promotion: {
        discountPercentage: 15,
        startDate: new Date('2024-12-01'),
        endDate: new Date('2024-12-15'),
      },
    },
    {
      name: 'Casual Summer Dress',
      price: 59.99,
      description: 'Light and breezy dress, perfect for summer days.',
      category: 'robe',
      stock: [
        { size: 'M', color: 'Yellow', quantity: 12 },
        { size: 'L', color: 'Green', quantity: 7 },
      ],
      images: [
        test,
        'https://example.com/images/casual-summer-dress-front.jpg',
        'https://example.com/images/casual-summer-dress-back.jpg',
      ],
      promotion: {
        discountPercentage: 10,
        startDate: new Date('2024-12-10'),
        endDate: new Date('2024-12-20'),
      },
    },
    {
      name: 'Classic Black Dress',
      price: 89.99,
      description: 'A timeless black dress for all occasions.',
      category: 'robe',
      stock: [
        { size: 'S', color: 'Black', quantity: 6 },
        { size: 'M', color: 'Black', quantity: 8 },
        { size: 'L', color: 'Black', quantity: 10 },
      ],
      images: [
        test,
        'https://example.com/images/classic-black-dress-front.jpg',
      ],
      promotion: {
        discountPercentage: null,
        startDate: null,
        endDate: null,
      },
    },
  ];
  const { data, loading, error } = useFetch('http://localhost:3000/api/product/getProducts');
  const [isOpen, setIsOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: "All",
    priceRange: "All",
  });

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
    const filteredProducts = data
    ? data.filter((product) => {
        const categoryMatch = filters.category === "All" || product.category === filters.category;
        const priceMatch = filters.priceRange === "All" ||
          (filters.priceRange === "$0 - $50" && product.price <= 50) ||
          (filters.priceRange === "$50 - $100" && product.price > 50 && product.price <= 100) ||
          (filters.priceRange === "$100+" && product.price > 100);

        return categoryMatch && priceMatch;
      })
    : [];

    return ( 
      <div className="grid grid-cols-2 items-center justify-center sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 md:pt-0 w-full place-content-center">
        {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product._id || index}
                    image={product.images}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                  />
                ))
            ) : (
                <p className="text-center col-span-full">No products found for the selected filters.</p>
            )}
      </div>
     );
}
 
export default ProductGrid;