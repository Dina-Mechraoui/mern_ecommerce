import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true }, 
    category: {
        type: String,
        enum: ['robe'], 
        required: true 
    }, 

    stock: [{
        size: { type: String, required: true }, 
        color: { type: String, required: true }, 
        quantity: { type: Number, required: true, min: 0 },
    }],

    images: {
        type: [String], 
        required: false,
    },

    promotion: {
        discountPercentage: { type: Number, min: 0, max: 100 },
        startDate: { type: Date, default: null },
        endDate: { type: Date, default: null },
    },
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

export default Product;