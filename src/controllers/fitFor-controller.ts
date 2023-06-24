import httpStatus from 'http-status';

import { Request, Response } from 'express';

import fitForService from '../services/fitFor-service';

export async function createFitFor(req: Request, res: Response) {
  const { nome } = req.body;
  try {
    const result = await fitForService.createFitFor(nome);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === 'AlreadyExists') {
      return res.status(httpStatus.CONFLICT).send({ message: 'Already exists' });
    } else {
      return res.status(httpStatus.BAD_REQUEST).send({});
    }
  }
}
