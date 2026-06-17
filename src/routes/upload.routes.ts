import { Router } from 'express';
import * as uploadController from '../controllers/upload.controller';
import { validate } from '../middlewares/validate.middleware';
import { PresignRequestSchema } from '../schemas/upload.schema';
import { authenticate } from '../middlewares/auth.middleware';

const router: Router = Router();

router.post('/presign', authenticate, validate({ body: PresignRequestSchema }), uploadController.presign);

export default router;
