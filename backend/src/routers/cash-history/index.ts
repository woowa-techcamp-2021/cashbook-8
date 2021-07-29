import { Router } from 'express';
import cashHistoryController from '../../controllers/cash-history.controller';
import wrapAsync from '../../lib/wrap-async';
import authMiddleware from '../../middlewares/auth.middleware';

const cashHistoryRouter = Router();

cashHistoryRouter.get('/', authMiddleware, wrapAsync(cashHistoryController.findCashHistories));

export default cashHistoryRouter;
