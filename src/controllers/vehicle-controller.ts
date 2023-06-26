import httpStatus from 'http-status';

import { Request, Response } from 'express';

import { AlreadyExists } from '../errors/already-exists';
import vehicleService from '../services/vehicle-service';

export async function createBrand(req: Request, res: Response) {
  const { imagem, nome } = req.body;

  try {
    const result = await vehicleService.createBrand({ imagem, nome });
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === 'AlreadyExists') {
      return res.status(httpStatus.CONFLICT).send({ message: 'Brand already exists' });
    } else {
      return res.status(httpStatus.BAD_REQUEST).send({});
    }
  }
}

export async function getAllBrands(req: Request, res: Response) {
  try {
    const categories = await vehicleService.getAllBrands();
    return res.status(httpStatus.OK).send(categories);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({});
  }
}

export async function registerModel(req: Request, res: Response) {
  const { nome, marcaId, imagem } = req.body;

  try {
    const result = await vehicleService.registerModel({ nome, marcaId, imagem });
    if (result === 'AlreadyExists') {
      return res.status(httpStatus.CONFLICT).send({ message: 'Model already exists' });
    }
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }
}

export async function getAllModels(req: Request, res: Response) {
  try {
    const models = await vehicleService.getAllModels();
    return res.status(httpStatus.OK).send(models);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({});
  }
}

export async function getModelsByVehicleId(req: Request, res: Response){
  const vehicleId = req.params.id;
  const numberVehicleId = Number(vehicleId);
  try{
    const models = await vehicleService.getModelByVehicleId(numberVehicleId);
    console.log(models)
    return res.status(httpStatus.OK).send(models);
  }catch(error){
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({});
  }
}

export async function registerVersion(req: Request, res: Response) {
  const { nome, modeloId, ano, imagem, observacoes } = req.body;

  try {
    const result = await vehicleService.registerVersion({ nome, modeloId, imagem, ano, observacoes });
    if (result === 'AlreadyExists') {
      return res.status(httpStatus.CONFLICT).send({ message: 'Version already exists' });
    }
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }
}

export async function getAllVersions(req: Request, res: Response) {
  try {
    const versions = await vehicleService.getAllVersions();
    return res.status(httpStatus.OK).send(versions);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({});
  }
}
