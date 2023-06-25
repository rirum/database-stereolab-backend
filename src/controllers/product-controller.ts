import httpStatus from 'http-status';

import { Request, Response } from 'express';


import productService from '../services/product-service';


export async function createProduct(req: Request, res: Response) {
  const {
    nome,
    codigoProduto,
    marcaProduto,
    codigoFabricante,
    categoriaProdutoId,
    versaoCarroId
  } = req.body;

  try {
    const product = await productService.createProduct( 
      nome,
      codigoProduto,
      marcaProduto,
      codigoFabricante,
      categoriaProdutoId,
      versaoCarroId
    );

    return res.status(httpStatus.OK).send(product);
  } catch (error) {
    if (error.name === 'AlreadyExists') {
      return res.status(httpStatus.CONFLICT).send({ message: 'Product already exists' });
    } else {
      return res.status(httpStatus.BAD_REQUEST).send({});
    }
  }
}
