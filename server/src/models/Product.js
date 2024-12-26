import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: { type: String },
    price: { type: Number },
    description: { type: String},
    category: {
        type: String,
        enum: ['robe'],
    },

    stock: [{
        size: { type: String, required: false },
        color: { type: String, required: false },
        quantity: { type: Number, required: false, min: 0 },
    }],

    images: {
        type: [String], 
    },

    promotion: {
        discountPercentage: { type: Number, default: null },
        startDate: { type: Date, default: null },
        endDate: { type: Date, default: null },
    },
}, { timestamps: true });


const Product = mongoose.model('Product', ProductSchema);

export default Product;
