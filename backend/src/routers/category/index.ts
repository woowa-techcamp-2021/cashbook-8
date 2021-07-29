import { Router } from 'express';
import categoryController from '../../controllers/category.controller';
import wrapAsync from '../../lib/wrap-async';
import authMiddleware from '../../middlewares/auth.middleware';

const categoryRouter = Router();

categoryRouter.get('/all', authMiddleware, wrapAsync(categoryController.findCategories));
categoryRouter.post('/', authMiddleware, wrapAsync(categoryController.createCategory));
categoryRouter.delete('/:id', authMiddleware, wrapAsync(categoryController.deleteCategory));

export default categoryRouter;
