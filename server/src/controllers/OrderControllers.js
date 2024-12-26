import Order from '../models/Order.js'

const addOrder = async (req, res) => {
    try {
        const { fullName,totalPrice, phone,regionId,shippingRate, shippingAddress, shippingMethod } = req.body;

        if (!req.session.cart || req.session.cart.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const newOrder = new Order({
            fullName,
            totalPrice,
            phone,
            regionId,
            shippingRate,
            cart: req.session.cart,
            shippingAddress,
            shippingMethod
        })
        await newOrder.save();
        req.session.cart = [];
        res.status(201).json({ message: 'Order placed successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

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
