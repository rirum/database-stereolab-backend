import { Router } from 'express';

import { createCategory, findCategory, getAllCategories } from '../controllers/category-controller';

const categoryRouter = Router();

categoryRouter.post('/', createCategory);
categoryRouter.get('/', getAllCategories);
categoryRouter.get('/:nome', findCategory);

export { categoryRouter };
