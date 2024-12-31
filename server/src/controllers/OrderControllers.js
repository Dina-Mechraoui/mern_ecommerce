import Order from '../models/Order.js'

const addOrder = async (req, res) => {
    try {
        // Log the incoming request body
        console.log('Received order data:', req.body);

        const { fullName, phone, region, cart, shippingMethod, shippingAddress, totalPrice } = req.body;

        // Log the cart and validate if it's empty
        if (!cart || cart.length === 0) {
            console.log('Cart is empty');
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Log the order details before saving
        console.log('Creating new order with details:', {
            fullName,
            totalPrice,
            phone,
            region,
            cart,
            shippingAddress,
            shippingMethod
        });

        // Create a new order document
        const newOrder = new Order({
            fullName,
            totalPrice,
            phone,
            region,
            cart,
            shippingAddress,
            shippingMethod
        });

        // Save the new order to the database
        await newOrder.save();
        console.log('Order saved successfully:', newOrder);

        // Optionally, clear the session cart (if using session storage)
        // req.session.cart = [];

        // Log success and send the response
        console.log('Order placed successfully');
        res.status(201).json({ message: 'Order placed successfully' });

    } catch (error) {
        // Log error details
        console.error('Error while placing order:', error.message);
        res.status(500).json({ error: error.message });
    }
};


const getOrders = async (req, res)=>{
    try {
        const orders = await Order.find()
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getPendingOrders = async (req, res)=>{
    try {
        const orders = await Order.find({ status: 'Pending' });
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No pending orders found' });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getOrder = async (req, res)=>{
    try {
        const {id} = req.params
        const order = await Order.findById(id)
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateStatus = async (req, res)=>{
    try {
        const {id} = req.params
        const { status } = req.body; 
        if (!['Pending', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order status updated', order: updatedOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export {addOrder, getOrders, getOrder, updateStatus,getPendingOrders}
