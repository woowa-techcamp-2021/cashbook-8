import { Router } from 'express';
import authController from '../../controllers/auth.controller';

const authRouter = Router();

authRouter.get('/callback', authController.callback);

export default authRouter;
