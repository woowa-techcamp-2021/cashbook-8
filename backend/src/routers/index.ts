import { Router } from 'express';
import authRouter from './auth';
import userRouter from './user';
import categoryRouter from './category';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/category', categoryRouter);

export default apiRouter;
