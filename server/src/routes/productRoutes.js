import {Router} from 'express'
import upload from '../config/multerConfig.js'
import adminAuth from '.././middleware/adminAuth.js';
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/ProductControllers.js'

const router = Router()

router.post('/addProduct',adminAuth, upload.array('images', 10), addProduct);
router.get('/getProducts', getProducts)
router.delete('/deleteProduct/:id',adminAuth, deleteProduct)
router.put('/updateProduct/:id',adminAuth, updateProduct)
router.get('/getProduct/:id', getProduct)

export default router