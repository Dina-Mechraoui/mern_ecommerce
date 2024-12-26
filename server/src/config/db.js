import mongoose from 'mongoose'
import 'dotenv/config';

const connectDB = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.DATABASE_URL)
        console.log('MongoDB connected:', connect.connection.host)
    } catch (error) {
        console.log('connection failed, error:', error)
    }
}

export default connectDB