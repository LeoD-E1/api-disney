import { Router } from 'express';
import { register, login } from '../controllers/users.controllers'

const router = Router();

router.post('/signup', register)
router.post('/signin', login)

export default router;