import { marca_carro, modelo_carro, versao_carro } from '@prisma/client';
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

async function getAllModels(): Promise<modelo_carro[]> {
  const models = await prisma.modelo_carro.findMany();
  return models;
}

async function getModelsByVehicleId(vehicleId: number) {
  const models = await prisma.modelo_carro.findMany({
    where: { marca_id: vehicleId }
  });
  return models;
}

async function registerVersion(
  nome: string,
  modeloId: number,
  ano: number,
  observacoes?: string,
  imagem?: string
): Promise<versao_carro> {
  const normalizedVersionName = diacritics.remove(nome.toLowerCase());

  const existingVersion = await prisma.versao_carro.findUnique({
    where: {
      nome: normalizedVersionName
    }
  });

  if (existingVersion) {
    return 'AlreadyExists';
  }

  const version = await prisma.versao_carro.create({
    data: {
      imagem,
      nome: normalizedVersionName,
      ano,
      observacoes,
      modelo_carro: {
        connect: {
          id: modeloId
        }
      }
    }
  });

  return version;
}

async function getVersionByModelId(marcaId: number) {
  const models = await prisma.versao_carro.findMany({
    where: { modelo_id: marcaId }
  });

  return models;
}

async function getAllVersions(): Promise<versao_carro[]> {
  const versions = await prisma.versao_carro.findMany();
  return versions;
}

const vehicleRepository = {
  registerBrand,
  getAllBrands,
  registerModel,
  getAllModels,
  getModelsByVehicleId,
  registerVersion,
  getAllVersions,
  getVersionByModelId
};

export default vehicleRepository;
