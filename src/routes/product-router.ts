import { Router } from 'express';

import { createProduct } from '../controllers/product-controller';

const productRouter = Router();

productRouter.post('/', createProduct);

export { productRouter };
