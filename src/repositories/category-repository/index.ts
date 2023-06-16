import { categoria_produto } from '@prisma/client';
import diacritics from 'diacritics';

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

async function findCategory(nome: string) {
  const stringWithoutAccent = diacritics.remove(nome.toLowerCase());
  console.log(stringWithoutAccent);
  const existingCategory = await prisma.categoria_produto.findUnique({
    where: {
      nome: stringWithoutAccent
    }
  });
  console.log('passou');
  return existingCategory;
}
const registerRepository = {
  registerCategory,
  getAllCategories,
  findCategory
};

export default registerRepository;
