import { Router } from 'express';
import * as qrController from '../controllers/qr.controller';
import { validate } from '../middlewares/validate.middleware';
import { QrApproveRequestSchema } from '../schemas/qr.schema';
import { authenticate } from '../middlewares/auth.middleware';

const router: Router = Router();

router.post('/generate', qrController.generate);
router.post('/approve', authenticate, validate({ body: QrApproveRequestSchema }), qrController.approve);
router.get('/status/:codigo', qrController.checkStatus);

export default router;
