import { produto } from '@prisma/client';

import { CreateProductParams } from '../../@types/product.type';
import { notFoundError } from '../../errors/not-found-error';
import productRepository from '../../repositories/product-repository';

async function createProduct(params: CreateProductParams) {
  const product = await productRepository.createProduct(params.nome, params);

  if (!product) throw notFoundError();

  return product;
}

const productService = {
  createProduct
};
export default productService;
