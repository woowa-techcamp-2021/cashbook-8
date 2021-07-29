import { Router } from 'express';
import paymentController from '../../controllers/payment.controller';
import wrapAsync from '../../lib/wrap-async';
import authMiddleware from '../../middlewares/auth.middleware';

const paymentRouter = Router();

paymentRouter.get('/all', authMiddleware, wrapAsync(paymentController.findPayments));
paymentRouter.post('/', authMiddleware, wrapAsync(paymentController.createPayment));
paymentRouter.delete('/:id', authMiddleware, wrapAsync(paymentController.deletePayment));

export default paymentRouter;
