import {Router} from 'express'
import { addToCart, removeFromCart, getCart } from '../controllers/CartControllers.js'

const router = Router()

router.get('/getCart', getCart)
router.post('/addToCart', addToCart)
router.put('/removeFromCart', removeFromCart)

export default router