import mongoose, { mongo } from "mongoose";
import { ObjectId, Timestamp } from "mongodb";

const {Schema} = mongoose

const OrderSchema = new Schema({
    fullName: {type: String, required: true},
    totalPrice: { type: Number, required: true },
    phone: {type: Number, required: true},
    cart: { type: Array, required: true },
    status: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    region: { type: String, required: true },
    shippingMethod: {type: String, enum: ['home', 'desk'], required: true},
    shippingAddress: { type: String, required: false }
})

const Order = mongoose.model('Order', OrderSchema)

export default Order