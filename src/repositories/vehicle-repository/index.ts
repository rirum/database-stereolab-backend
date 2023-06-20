import { marca_carro } from '@prisma/client';
import diacritics from 'diacritics';

import prisma from '../../configs/database.connection';
import { AlreadyExists } from '../../errors/already-exists';

async function registerBrand(nome: string, imagem?: string) {
  const normalizedCategoryName = diacritics.remove(nome.toLowerCase());

  const existingCategory = await prisma.marca_carro.findUnique({
    where: {
      nome: normalizedCategoryName
    }
  });

  if (existingCategory) {
    throw AlreadyExists();
  }

  const category = await prisma.marca_carro.create({
    data: {
      imagem,
      nome: normalizedCategoryName
    }
  });
  return category;
}

async function getAllBrands(): Promise<marca_carro[]> {
  const brands = await prisma.marca_carro.findMany();
  return brands;
}

const vehicleRepository = {
  registerBrand,
  getAllBrands
};

export default vehicleRepository;
