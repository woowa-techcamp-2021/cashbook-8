import { Router } from 'express';
import authRouter from './auth';
import userRouter from './user';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/user', userRouter);

export default apiRouter;
