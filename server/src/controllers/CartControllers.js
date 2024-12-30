const getCart = async (req, res) => {
    console.log('got cart')
  
  // Safely check if the session exists before debugging it
  if (req.session) {
      console.log('Session:', req.session);
  } else {
      console.log('Session: No session data available');
  }
    res.json({ cart: req.session.cart || [] });
};

const addToCart = async (req, res) => {
    console.log('addToCart invoked');
    
    // Destructuring the request body
    const { productId, size, color, quantity, price } = req.body;
    console.log('Received data:', { productId, size, color, quantity, price });

    // Check for missing fields
    if (!productId || !size || !color || !quantity) {
        console.log('Error: Missing required fields');
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Creating the cart item
    const cartItem = { productId, size, color, quantity, price };
    console.log('Cart item created:', cartItem);

    // Initialize session cart if not already present
    if (!req.session.cart) {
        console.log('Initializing new cart');
        req.session.cart = [];
    } else {
        console.log('Cart already exists:', req.session.cart);
    }

    // Check if the item already exists in the cart
    const existingItemIndex = req.session.cart.findIndex(item => 
        item.productId === productId && item.size === size && item.color === color
    );
    console.log('Existing item index:', existingItemIndex);

    // If item exists, update the quantity, otherwise add a new item
    if (existingItemIndex > -1) {
        console.log('Item found in cart, updating quantity');
        req.session.cart[existingItemIndex].quantity += quantity;
    } else {
        console.log('Item not found in cart, adding new item');
        console.log('Session before adding item:', req.session);
        req.session.cart.push(cartItem);
        console.log('Session after adding item:', req.session);

    }

    console.log('Updated cart:', req.session.cart);

    // Respond with updated cart
    res.json({ message: 'Item added to cart', cart: req.session.cart });
};

    const getItemsCount = async (req, res) => {
        const cart = req.session.cart || [];
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        res.json({ count });
    };
  



const removeFromCart = async (req, res) => {
    const { productId, size, color } = req.body;

    if (!productId || !size || !color) {
        return res.status(400).json({ message: 'productId, size, and color are required' });
    }

    if (!req.session.cart || req.session.cart.length === 0) {
        return res.status(404).json({ message: 'Cart is empty' });
    }

    const itemIndex = req.session.cart.findIndex(item =>
        item.productId === productId && item.size === size && item.color === color
    );

    if (itemIndex > -1) {
        req.session.cart.splice(itemIndex, 1);
        res.json({ message: 'Item removed from cart', cart: req.session.cart });
    } else {
        res.status(404).json({ message: 'Item not found in cart' });
    }
}



export {addToCart,getItemsCount, removeFromCart, getCart}