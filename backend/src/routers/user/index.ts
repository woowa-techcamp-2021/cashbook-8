import { Router } from 'express';
import userController from '../../controllers/user.controller';
import wrapAsync from '../../lib/wrap-async';
import authMiddleware from '../../middlewares/auth.middleware';

const userRouter = Router();

userRouter.get('/my', authMiddleware, wrapAsync(userController.findMyProfile));

export default userRouter;
