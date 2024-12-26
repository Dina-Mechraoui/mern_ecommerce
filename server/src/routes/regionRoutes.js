import {Router} from 'express'
import { addRegion, getRegions, calculateShippingRate } from '../controllers/RegionControllers.js'


const router = Router()

router.post('/addRegion', addRegion)
router.get('/getRegions', getRegions)
router.get('/shippingPrice', calculateShippingRate)

export default router