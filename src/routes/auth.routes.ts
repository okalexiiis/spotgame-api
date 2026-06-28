import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { RegisterSchema, LoginSchema } from '../schemas/auth.schema';
import { authLimiter } from '../middlewares/rateLimit';

const router: Router = Router();

router.post('/register', authLimiter, validate({ body: RegisterSchema }), authController.register);
router.post('/login', authLimiter, validate({ body: LoginSchema }), authController.login);
router.post('/logout', authController.logout);

export default router;
