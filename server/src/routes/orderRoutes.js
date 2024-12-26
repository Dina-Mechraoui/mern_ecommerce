import {Router} from 'express'
import adminAuth from '../middleware/adminAuth.js';
import { addOrder, getOrder, getOrders, updateStatus, getPendingOrders } from '../controllers/OrderControllers.js'


const router = Router()

router.post('/addOrder', addOrder)
router.get('/getOrders',adminAuth,   getOrders)
router.get('/getPendingOrders',adminAuth,   getPendingOrders)
router.get('/getOrder/:id',adminAuth,  getOrder)
router.put('/status/:id',adminAuth, updateStatus)


export default router