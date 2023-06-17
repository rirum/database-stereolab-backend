import { categoria_produto } from '@prisma/client';
import diacritics from 'diacritics';

import prisma from '../../configs/database.connection';
import { AlreadyExists } from '../../errors/already-exists';

async function registerCategory(nome: string) {
  const normalizedCategoryName = diacritics.remove(nome.toLowerCase());

  for (let i = 0; i < normalizedCategoryName.length; i++) {
    const character = normalizedCategoryName[i];

    const existingCategory = await prisma.categoria_produto.findUnique({
      where: {
        nome: character
      }
    });

    if (existingCategory) {
      throw AlreadyExists();
    }
  }

  const category = await prisma.categoria_produto.create({
    data: {
      nome: normalizedCategoryName
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
