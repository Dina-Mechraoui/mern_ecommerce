import mongoose, { mongo } from "mongoose";
import { ObjectId, Timestamp } from "mongodb";

const {Schema} = mongoose

const RegionSchema = new Schema({
    name: { type: String, required: true },
    shippingRate: [
        {
            type: { type: String, enum: ['home', 'desk'], required: false },
            price: { type: Number, required: false },
        }
    ]
})

const Region = mongoose.model('Region', RegionSchema)

export default Region