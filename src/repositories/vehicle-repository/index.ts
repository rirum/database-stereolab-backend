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

async function registerModel(imagem?: string, nome: string, marca_id: number): Promise<marca_carro> {
  const normalizedModelName = diacritics.remove(nome.toLowerCase());
  console.log('passou1');
  const existingModel = await prisma.modelo_carro.findUnique({
    where: {
      nome: normalizedModelName
    }
  });

  if (existingModel) {
    throw AlreadyExists();
  }

  const model = await prisma.modelo_carro.create({
    data: {
      imagem,
      nome: normalizedModelName,
      marca_id
    }
  });
  console.log('passou');
  return model;
}

type CreateModeloCarroParams = {
  nome: string;
  marca_id: number;
  imagem?: string;
};

const vehicleRepository = {
  registerBrand,
  getAllBrands,
  registerModel
};

export default vehicleRepository;
