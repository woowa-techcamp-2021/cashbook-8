import { Router } from 'express';
import authController from '../../controllers/auth.controller';
import wrapAsync from '../../lib/wrap-async';

const authRouter = Router();

authRouter.get('/callback', wrapAsync(authController.callback));

export default authRouter;
