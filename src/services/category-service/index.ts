import { categoria_produto } from '@prisma/client';
import { remove } from 'diacritics';

import { notFoundError } from '../../errors/not-found-error';
import registerRepository from '../../repositories/category-repository';

async function createCategory(params: CreateCategoryParams) {
  const category = await registerRepository.registerCategory(params.nome);
  if (!category) throw notFoundError();

  return category;
}

async function getAllCategories(): Promise<categoria_produto[]> {
  const categories = await registerRepository.getAllCategories();
  return categories;
}

async function findCategory(nome: string) {
  const findCategory = await registerRepository.findCategory(nome);
  return findCategory;
}

export type CreateCategoryParams = { nome: string };

const categoryService = {
  createCategory,
  getAllCategories,
  findCategory
};

export default categoryService;
