
const getCart = async (req, res) => {
    res.json({ cart: req.session.cart || [] });
}

const addToCart = async (req, res) => {
    const { productId, size, color, quantity } = req.body;

    if (!productId || !size || !color || !quantity) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const cartItem = {
        productId,
        size,
        color,
        quantity
    };

    if (!req.session.cart) {
        req.session.cart = [];
    }

    const existingItemIndex = req.session.cart.findIndex(item => 
        item.productId === productId && item.size === size && item.color === color
    );

    if (existingItemIndex > -1) {
        req.session.cart[existingItemIndex].quantity += quantity;
    } else {
        req.session.cart.push(cartItem);
    }

    res.json({ message: 'Item added to cart', cart: req.session.cart });
}

const removeFromCart = async (req, res) =>{
    const { productId, size, color } = req.body;

    if (!productId || !size || !color) {
        return res.status(400).json({ message: 'productId, size, and color are required' });
    }

    if (!req.session.cart) {
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


export {addToCart, removeFromCart, getCart}