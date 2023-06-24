import { produto } from '@prisma/client';

import { CreateProductParams } from '../../@types/product.type';
import { notFoundError } from '../../errors/not-found-error';
import productRepository from '../../repositories/product-repository';

async function createProduct(productName: string, params: CreateProductParams) {
  console.log('service');
  const product = await productRepository.createProduct(productName, params);
  console.log('passou34');

  if (!product) throw notFoundError();

  return product;
}

const productService = {
  createProduct
};
export default productService;
