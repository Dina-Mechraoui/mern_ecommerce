import express from 'express';
import connectDB from './config/db.js';
import ProductRoutes from './routes/productRoutes.js';
import OrderRoutes from './routes/orderRoutes.js';
import sessionMiddleware from './middleware/session.js';
import CartRoutes from './routes/cartRoutes.js';
import RegionRoutes from './routes/regionRoutes.js';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import AdminRoutes from './routes/AdminRoutes.js';
import dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(helmet());
app.set('trust proxy', 1);

const allowedOrigins = [
  'https://kl-collection.vercel.app',
  'https://kl-collection-git-main-dina-mechraouis-projects.vercel.app',
  'https://kl-collection-2bfskr00f-dina-mechraouis-projects.vercel.app',
  'http://localhost:5173',
  'https://vercel.com/dina-mechraouis-projects/kl-collection/8tknHtaiVU4DFoZyXXRepPkWNKZg',
  'https://kl-collection.vercel.app/',
  'https://kl-collection-dina-mechraouis-projects.vercel.app/',
  'https://kl-collection-git-main-dina-mechraouis-projects.vercel.app/'

];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(sessionMiddleware);

app.use('/api/product', ProductRoutes);
app.use('/api/cart', CartRoutes);
app.use('/api/order', OrderRoutes);
app.use('/api/region', RegionRoutes);
app.use('/api/admin', AdminRoutes);

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message, err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

process.on('SIGINT', async () => {
  console.log('Received SIGINT. Closing server...');
  await mongoose.disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM. Closing server...');
  await mongoose.disconnect();
  process.exit(0);
});
