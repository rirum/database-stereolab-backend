import { Router } from 'express';

import { createProduct, deletedProduct, getAllProducts, updateProduct } from '../controllers/product-controller';

const productRouter = Router();

productRouter.post('/', createProduct);
productRouter.get('/', getAllProducts)
productRouter.put('/', updateProduct);
productRouter.delete('/', deletedProduct)

export { productRouter };
