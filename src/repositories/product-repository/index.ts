import { PrismaClient } from '@prisma/client';
import diacritics from 'diacritics';

import { CreateProductParams } from '../../@types/product.type';
import prisma from '../../configs/database.connection';

const createProduct = async (productName: string, params: CreateProductParams) => {
  const normalizedProductName = diacritics.remove(productName.toLowerCase());

  const existingProduct = await prisma.produto.findFirst({
    where: {
      nome: normalizedProductName
    }
  });

  if (existingProduct) {
    return 'AlreadyExists';
  }
  const product = await prisma.produto.create({
    data: {
      ...params,
      nome: normalizedProductName
    }
  });

  return product;
};
const productRepository = {
  createProduct
};
export default productRepository;
