// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// const ProductSchema = new Schema({
//     name: { type: String },
//     price: { type: Number },
//     description: { type: String},
//     category: {
//         type: String,
//         enum: ['robe'],
//     },

//     stock: [{
//         size: { type: String, required: false },
//         color: { type: String, required: false },
//         quantity: { type: Number, required: false, min: 0 },
//     }],

//     images: {
//         type: [String], 
//     },

//     promotion: {
//         discountPercentage: { type: Number, default: null },
//         startDate: { type: Date, default: null },
//         endDate: { type: Date, default: null },
//     },
// }, { timestamps: true });


// const Product = mongoose.model('Product', ProductSchema);

// export default Product;


import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: { type: String, required: true }, // Add required: true
    price: { type: Number, required: true, min: 0 }, // Add required: true and min: 0
    description: { type: String, required: true }, // Add required: true 
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
        required: false, // Add required: true 
        // validate: {
        //     validator: function(v) {
        //         return v.length > 0; 
        //     },
        //     message: 'At least one image URL is required'
        // }
    },

    promotion: {
        discountPercentage: { type: Number, min: 0, max: 100 }, // Add min: 0, max: 100
        startDate: { type: Date, default: null },
        endDate: { type: Date, default: null },
    },
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

export default Product;