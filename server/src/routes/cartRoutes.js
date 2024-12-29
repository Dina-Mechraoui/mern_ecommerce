import {Router} from 'express'
import { addToCart,getItemsCount, removeFromCart, getCart } from '../controllers/CartControllers.js'

const router = Router()

router.get('/getCart', getCart)
router.post('/addToCart', addToCart)
router.put('/removeFromCart', removeFromCart)
router.get('/getItemCount', getItemsCount)

export default router