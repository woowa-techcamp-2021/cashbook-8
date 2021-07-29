import { Router } from 'express';
import cashHistoryController from '../../controllers/cash-history.controller';
import wrapAsync from '../../lib/wrap-async';
import authMiddleware from '../../middlewares/auth.middleware';

const cashHistoryRouter = Router();

cashHistoryRouter.get('/', authMiddleware, wrapAsync(cashHistoryController.findCalendarCashHistories));
cashHistoryRouter.post('/', authMiddleware, wrapAsync(cashHistoryController.createCashHistory));
cashHistoryRouter.put('/:id', authMiddleware, wrapAsync(cashHistoryController.updateCashHistory));
cashHistoryRouter.delete('/:id', authMiddleware, wrapAsync(cashHistoryController.deleteCashHistory));

export default cashHistoryRouter;
