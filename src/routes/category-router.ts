import { Router } from 'express';

import { createCategory, getAllCategories } from '../controllers/category-controller';

const categoryRouter = Router();

categoryRouter.post('/', createCategory);
categoryRouter.get('/', getAllCategories);

export { categoryRouter };
