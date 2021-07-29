import { Router } from 'express';
import authRouter from './auth';
import userRouter from './user';
import categoryRouter from './category';
import paymentRouter from './payment';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/category', categoryRouter);
apiRouter.use('/payment', paymentRouter);

export default apiRouter;
