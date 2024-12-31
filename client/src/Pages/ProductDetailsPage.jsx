import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";
import useCart from "../hooks/useCart";
import Button from "../components/common/Button";
import useCartContext from "../contexts/CartContext";
const ProductDetailsPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const { id } = useParams();
  const { data, loading, error } = useFetch(`${apiUrl}/api/product/getProduct/${id}`);

  const {setCartCount } = useCartContext();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    if (data && data.images && data.images.length > 0) {
      setSelectedImage(data.images[0]);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error?.message}</div>;
  if (!data) return <div>No product found.</div>;

  const isPromotionActive = data.promotion?.startDate && data.promotion?.endDate &&
    new Date() >= new Date(data.promotion.startDate) && new Date() <= new Date(data.promotion.endDate);
  const discountPrice = isPromotionActive ? data.price * (1 - data.promotion.discountPercentage / 100) : data.price;

  const getAvailableOptions = (product, selectedSize = null, selectedColor = null) => {
    if (!product.stock || product.stock.length === 0) {
      return { sizes: {}, colors: {}, maxQuantity: 0 };
    }

    const sizes = {};
    const colors = {};
    let maxQuantity = 0;

    product.stock.forEach(({ size, color, quantity }) => {
      if (quantity > 0) {
        sizes[size] = sizes[size] || {};
        colors[color] = colors[color] || {};
        sizes[size][color] = true;
        colors[color][size] = true;
      }
    });

    if (selectedColor) {
      for (const size in sizes) {
        sizes[size] = sizes[size][selectedColor] || false;
      }
    } else {
      for (const size in sizes) {
        sizes[size] = Object.values(sizes[size]).some(Boolean);
      }
    }

    if (selectedSize) {
      for (const color in colors) {
        colors[color] = colors[color][selectedSize] || false;
      }
    } else {
      for (const color in colors) {
        colors[color] = Object.values(colors[color]).some(Boolean);
      }
    }

    if (selectedSize && selectedColor) {
      product.stock.forEach(({ size, color, quantity }) => {
        if (size === selectedSize && color === selectedColor) {
          maxQuantity = Math.max(maxQuantity, quantity);
        }
      });
    }

    return { sizes, colors, maxQuantity };
  };

  const options = getAvailableOptions(data, selectedSize, selectedColor);
  const { sizes, colors, maxQuantity } = options;

  // const handleAddToCart = async () => {
  //   console.log("Button clicked");
  //   const cartItem = {
  //     productId: data._id,
  //     size: selectedSize,
  //     color: selectedColor,
  //     quantity: Number(quantity),
  //     price: data.price,
  //   };
  
  //   console.log("Cart Item Payload:", cartItem);
  
  //   try {
  //     const response = await fetch(`${apiUrl}/api/cart/addToCart`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(cartItem),
  //       credentials: "include",
  //     });
  
  //     console.log("Response:", response);
  
  //     if (!response.ok) throw new Error("Failed to add to cart");
  
  //     const result = await response.json();
  //     console.log(result)
  //   // window.location.reload()
  
  //   } catch (error) {
  //     console.error("Error adding to cart:", error);
  //   }
  // };
  
  const handleAddToCart = () => {
    // Retrieve current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Create a cart item object
    const cartItem = {
      productId: data._id,
      name: data.name,
      quantity: Number(quantity),
      price: discountPrice, // using the discount price
      size: selectedSize,
      color: selectedColor
    };
  
    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex(item => 
      item.productId === data._id && item.size === selectedSize && item.color === selectedColor
    );
  
    if (existingItemIndex > -1) {
      // If the item exists, increase the quantity
      cart[existingItemIndex].quantity += quantity;
    } else {
      // If the item doesn't exist, add a new item to the cart
      cart.push(cartItem);
    }
  
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  
    updateCartCount();
  };
  
  
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };
  
  
  const handleSizeSelection = (size) => {
    setSelectedSize(size === selectedSize ? null : size);
  };

  const handleColorSelection = (color) => {
    setSelectedColor(color === selectedColor ? null : color);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <div className="flex h-full w-full justify-center items-center bg-gray-50">
      <div className="flex flex-col p-10 md:flex-row md:p-6 items-center justify-center md:gap-10 gap-4">
        <div className="flex flex-col-reverse lg:flex-row gap-3">
          <div className="flex lg:flex-col overflow-x-scroll gap-2 lg:overflow-y-scroll">
            {data.images?.length > 0 ? (
              data.images.map((image, index) => (
                <button key={index} onClick={() => setSelectedImage(image)}>
                  <img src={image} alt={data.name} className="w-16 h-16 object-cover rounded-lg" />
                </button>
              ))
            ) : (
              <p>No images available.</p>
            )}
          </div>
          {selectedImage ? (
            <img
              src={selectedImage}
              alt={data.name}
              className="object-cover max-h-96 xl:min-h-[500px] rounded-lg"
            />
          ) : (
            <p>No main image available.</p>
          )}
        </div>

        <div className="my-4 sm:mt-0 self-start">
          <h1 className="text-xl md:text-2xl xl:text-3xl font-bold">{data.name}</h1>
          <p className="text-lg lg:text-xl">
            {discountPrice} DA
            {isPromotionActive && (
              <span className="text-red-500 line-through ml-2">{data.price} DA</span>
            )}
          </p>
          <p className="mt-4 md:text-lg">{data.description}</p>

          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Available Sizes</h3>
            <div className="flex gap-2">
              {Object.entries(sizes).map(([size, available]) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelection(size)}
                  disabled={!available}
                  className={`px-4 py-2 text-sm rounded-xl transition border-black border-[1px] ${
                    available
                      ? selectedSize === size
                        ? "bg-[#FF8A3E] text-white "
                        : "border-gray-500 hover:bg-gray-200"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Available Colors</h3>
            <div className="flex gap-2">
              {Object.entries(colors).map(([color, available]) => (
                <button
                  key={color}
                  onClick={() => handleColorSelection(color)}
                  disabled={!available}
                  style={{
                    backgroundColor: available ? color : "",
                    opacity: available ? 1 : 0.5,
                  }}
                  className={`p-3 border-2 rounded-full transition ${
                    available
                      ? selectedColor === color
                        ? "border-black"
                        : ""
                      : "cursor-not-allowed"
                  }`}
                ></button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-4 mb-3">
              <label htmlFor="quantity" className="text-md font-semibold">Quantity</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={maxQuantity}
                className="border rounded-md p-2 w-24"
              />
            </div>
            <Button
              onclick={handleAddToCart}
              disabled={!selectedSize || !selectedColor}
              text="Add to Cart"
              px="px-6"
              py="py-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
