import { Router } from 'express';
import * as qrController from '../controllers/qr.controller';
import { validate } from '../middlewares/validate.middleware';
import { QrApproveRequestSchema } from '../schemas/qr.schema';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/authorize';
import { qrGenerateLimiter } from '../middlewares/rateLimit';

const router: Router = Router();

router.post('/generate', qrGenerateLimiter, qrController.generate);
router.post('/approve', authenticate, authorize('Admin'), validate({ body: QrApproveRequestSchema }), qrController.approve);
router.get('/status/:codigo', qrController.checkStatus);

export default router;
