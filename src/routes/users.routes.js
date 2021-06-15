import { Router } from 'express';
import { register, login } from '../controllers/users.controllers'
import { validators, validationVerify } from '../helpers/expressValidator'

const router = Router();

router.post('/signup', validators, validationVerify, register)
router.post('/signin', login)

export default router;