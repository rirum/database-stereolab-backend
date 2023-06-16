import { categoria_produto } from '@prisma/client';

import prisma from '../../configs/database.connection';

async function registerCategory(nome: string) {
  const category = await prisma.categoria_produto.create({
    data: {
      nome: nome
    }
  });
  return category;
}

async function getAllCategories(): Promise<categoria_produto[]> {
  const categories = await prisma.categoria_produto.findMany();
  return categories;
}
const registerRepository = {
  registerCategory,
  getAllCategories
};

export default registerRepository;
