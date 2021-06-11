import { Router } from 'express';
import { homeScreen } from '../controllers/home.controllers'
const router = Router()

router.get('/', homeScreen)

export default router