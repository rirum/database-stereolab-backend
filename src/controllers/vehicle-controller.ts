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
