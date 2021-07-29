import { Router } from 'express';
import authRouter from './auth';
import userRouter from './user';
import categoryRouter from './category';
import paymentRouter from './payment';
import cashHistoryRouter from './cash-history';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/category', categoryRouter);
apiRouter.use('/payment', paymentRouter);
apiRouter.use('/cash-history', cashHistoryRouter);

export default apiRouter;
