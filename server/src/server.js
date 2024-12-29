import express from 'express'
import connectDB from './config/db.js';
import ProductRoutes from './routes/productRoutes.js'
import OrderRoutes from './routes/orderRoutes.js';
import sessionMiddleware from './middleware/session.js';
import CartRoutes from './routes/CartRoutes.js'
import RegionRoutes from './routes/regionRoutes.js'
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import AdminRoutes from './routes/AdminRoutes.js'
import dotenv from 'dotenv';
dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000

connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];

const options = {
  origin: function(origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },credentials: true,
};

app.use(cors(options));
app.use(sessionMiddleware)

app.get('/', (req, res) => {
    if (!req.session.views) {
        req.session.views = 1;
    } else {
        req.session.views++;
    }
    res.send(`You've visited this page ${req.session.views} times`);
});
app.get('/session', (req, res) => {
    res.json(req.session);
});

app.use('/api/product',  ProductRoutes);
app.use('/api/cart', CartRoutes);
app.use('/api/order', OrderRoutes);
app.use('/api/region',  RegionRoutes);
app.use('/api/admin',  AdminRoutes)

app.listen(PORT, () => {
    console.log(`APP running at port ${PORT}`);
});
process.on('SIGINT', async () => {
    console.log('Closing server...');
    await mongoose.disconnect();
    process.exit(0);
});