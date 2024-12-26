import adminLogin from "../controllers/AdminControllers.js";
import { Router } from "express";

const router = Router()

router.post('/login', adminLogin)

export default router