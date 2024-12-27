import {Router} from 'express'
import upload from '../config/multerConfig.js'
import adminAuth from '.././middleware/adminAuth.js';
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct, getLatestProduct } from '../controllers/ProductControllers.js'

const router = Router()

router.post('/addProduct',adminAuth, upload.array('images', 10), addProduct);
router.get('/getProducts', getProducts)
router.delete('/deleteProduct/:id',adminAuth, deleteProduct)
router.put('/updateProduct/:id',adminAuth, upload.array('images', 10), updateProduct)
router.get('/getProduct/:id', getProduct)
router.get('/getLatestProduct', getLatestProduct)

export default router