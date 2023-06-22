import { marca_carro, modelo_carro } from '@prisma/client';
import diacritics from 'diacritics';

import prisma from '../../configs/database.connection';
import { AlreadyExists } from '../../errors/already-exists';

async function registerBrand(imagem?: string, nome: string) {
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

async function registerModel(nome: string, marcaId: number, imagem?: string): Promise<modelo_carro> {
  const normalizedModelName = diacritics.remove(nome.toLowerCase());

  const existingModel = await prisma.modelo_carro.findUnique({
    where: {
      nome: normalizedModelName
    }
  });

  if (existingModel) {
    return 'AlreadyExists';
  }

  const model = await prisma.modelo_carro.create({
    data: {
      imagem,
      nome: normalizedModelName,
      marca_carro: {
        connect: {
          id: marcaId
        }
      }
    }
  });

  return model;
}

const vehicleRepository = {
  registerBrand,
  getAllBrands,
  registerModel
};

export default vehicleRepository;
