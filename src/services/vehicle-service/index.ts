import { marca_carro, modelo_carro, versao_carro } from '@prisma/client';

import { notFoundError } from '../../errors/not-found-error';
import vehicleRepository from '../../repositories/vehicle-repository';

async function createBrand(params: CreateBrandParams) {
  // if (imagem === undefined){
  //     const brand = await vehicleRepository.registerBrand( nome);
  //     return brand;
  // }
  //   else{
  //     const brand = await vehicleRepository.registerBrand(imagem, nome);
  //     return brand;

  //   }

  const brand = await vehicleRepository.registerBrand(params.imagem, params.nome);

  if (!brand) throw notFoundError();

  return brand;
}

async function getAllBrands(): Promise<marca_carro[]> {
  const brands = await vehicleRepository.getAllBrands();
  return brands;
}

async function registerModel(params: CreateModelParams) {
  try {
    const model = await vehicleRepository.registerModel(params.nome, params.marcaId, params.imagem);
    if (!model) throw notFoundError();
    return model;
  } catch (error) {
    console.log(error);
  }
}
async function getAllModels(): Promise<modelo_carro[]> {
  const models = await vehicleRepository.getAllModels();
  return models;
}

async function getModelByVehicleId(vehicleId: number) {
  const models = await vehicleRepository.getModelsByVehicleId(vehicleId);

  return models;
}

async function getAllVersions(): Promise<versao_carro[]> {
  const versions = await vehicleRepository.getAllVersions();

  return versions;
}

async function getVersionByModelId(marcaId: number) {
  const models = await vehicleRepository.getVersionByModelId(marcaId);

  return models;
}

async function registerVersion(params: CreateVersionsParams) {
  try {
    const version = await vehicleRepository.registerVersion(
      params.nome,
      params.modeloId,
      params.ano,
      params.observacoes,
      params.imagem
    );
    if (!version) throw notFoundError();
    return version;
  } catch (error) {
    console.log(error);
  }
}

export type CreateBrandParams = { imagem?: string; nome: string };
export type CreateModelParams = { imagem?: string; nome: string; marcaId: number };
export type CreateVersionsParams = {
  imagem?: string;
  nome: string;
  modeloId: number;
  ano: number;
  observacoes?: string;
};

const vehicleService = {
  createBrand,
  getAllBrands,
  registerModel,
  getAllModels,
  getModelByVehicleId,
  registerVersion,
  getAllVersions,
  getVersionByModelId
};

export default vehicleService;
