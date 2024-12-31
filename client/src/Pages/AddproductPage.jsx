import React, { useState } from 'react';

const AddProductPage = () => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'robe', // default category
    stock: [{ size: '', color: '', quantity: '' }],
    images: [],
    promotion: {
      discountPercentage: '',
      startDate: '',
      endDate: '',
    },
  });

  const apiUrl = import.meta.env.VITE_API_URL;
  const [error, setError] = useState('');
  const adminToken = localStorage.getItem('adminToken');
  console.log(adminToken)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStockChange = (e, index) => {
    const { name, value } = e.target;
    const updatedStock = [...productData.stock];
    updatedStock[index][name] = value;
    setProductData({ ...productData, stock: updatedStock });
  };

  const handleAddStock = () => {
    setProductData({
      ...productData,
      stock: [...productData.stock, { size: '', color: '', quantity: '' }],
    });
  };

  const handleRemoveStock = (index) => {
    const updatedStock = productData.stock.filter((_, i) => i !== index);
    setProductData({ ...productData, stock: updatedStock });
  };

  const handlePromotionChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      promotion: { ...productData.promotion, [name]: value },
    });
  };

  const handleImageChange = (e) => {
    // Get the selected files and store them directly
    const files = Array.from(e.target.files);
    setProductData((prevData) => ({
      ...prevData,
      images: files, // Store files, not URLs
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    
    // Append all product data to FormData
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('description', productData.description);
    formData.append('category', productData.category);
    formData.append('stock', JSON.stringify(productData.stock));
    formData.append('promotion', JSON.stringify(productData.promotion));
    
    // Append each image file to FormData
    productData.images.forEach((file) => {
      formData.append('images', file);
    });
  
    try {
      const response = await fetch(`${apiUrl}/api/product/addProduct`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
        body: formData, // Send FormData with images
      });
  
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
  
      // Handle success (e.g., redirect or show success message)
    } catch (error) {
      setError('Error adding product: ' + error.message);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
            min="0"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">Category</label>
          <select
            id="category"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          >
            <option value="robe">Robe</option>
            {/* Add more categories if needed */}
          </select>
        </div>

        {/* Stock */}
        <div className="mb-4">
          <label className="block text-gray-700">Stock</label>
          {productData.stock.map((item, index) => (
            <div key={index} className="flex items-center space-x-4 mb-2">
              <input
                type="text"
                name="size"
                value={item.size}
                onChange={(e) => handleStockChange(e, index)}
                className="p-2 border border-gray-300 rounded"
                placeholder="Size"
                required
              />
              <input
                type="text"
                name="color"
                value={item.color}
                onChange={(e) => handleStockChange(e, index)}
                className="p-2 border border-gray-300 rounded"
                placeholder="Color"
                required
              />
              <input
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleStockChange(e, index)}
                className="p-2 border border-gray-300 rounded"
                placeholder="Quantity"
                required
                min="0"
              />
              <button
                type="button"
                onClick={() => handleRemoveStock(index)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddStock}
            className="bg-green-500 text-white py-2 px-4 rounded mt-2"
          >
            Add Stock Item
          </button>
        </div>

        {/* Promotion */}
        <div className="mb-4">
          <label className="block text-gray-700">Promotion</label>
          <div className="flex space-x-4">
            <input
              type="number"
              name="discountPercentage"
              value={productData.promotion.discountPercentage}
              onChange={handlePromotionChange}
              className="p-2 border border-gray-300 rounded"
              placeholder="Discount Percentage"
              min="0"
              max="100"
            />
            <input
              type="date"
              name="startDate"
              value={productData.promotion.startDate}
              onChange={handlePromotionChange}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="date"
              name="endDate"
              value={productData.promotion.endDate}
              onChange={handlePromotionChange}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="images" className="block text-gray-700">Product Images</label>
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="p-2 border border-gray-300 rounded mt-1"
          />
          <div className="mt-2">
  {productData.images.map((image, index) => (
    <img
      key={index}
      src={URL.createObjectURL(image)} // Use temporary URL for preview
      alt={`product-image-${index}`}
      className="w-24 h-24 object-cover rounded mt-2"
    />
  ))}
</div>

          </div>

        {/* Submit */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-400 text-white py-2 rounded"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
