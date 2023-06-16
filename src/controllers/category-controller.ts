import httpStatus from 'http-status';

import { Request, Response } from 'express';

import categoryService from '../services/category-service';

export async function createCategory(req: Request, res: Response) {
  const { nome } = req.body;
  try {
    const result = await categoryService.createCategory({ nome });
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export async function getAllCategories(req: Request, res: Response) {
  try {
    const categories = await categoryService.getAllCategories();
    return res.status(httpStatus.OK).send(categories);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({});
  }
}

export async function findCategory(req: Request, res: Response) {
  const { nome } = req.params;

  try {
    const find = await categoryService.findCategory(nome);
    if (find) {
      return res.status(httpStatus.CONFLICT).send({ message: 'Essa categoria já existe' });
    } else {
      return res.status(httpStatus.OK).send({ message: 'Categoria disponível' });
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({});
  }
}
