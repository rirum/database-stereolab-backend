import { produto } from '@prisma/client';
import diacritics from 'diacritics';

import { CreateProductParams } from '../../@types/product.type';
import prisma from '../../configs/database.connection';

const createProduct = async (productName: string, params: CreateProductParams) => {
  const normalizedProductName = diacritics.remove(productName.toLowerCase());
  console.log('passou');

  const existingProduct = await prisma.produto.findFirst({
    where: {
      nome: normalizedProductName
    }
  });
  console.log('passou2');
  if (existingProduct) {
    return 'AlreadyExists';
  }
  console.log('passou3');
  const product = await prisma.produto.create({
    data: {
      ...params,
      nome: normalizedProductName
    }
  });
  console.log('passou4');
  console.log(product);
  return product;
};
const productRepository = {
  createProduct
};
export default productRepository;
