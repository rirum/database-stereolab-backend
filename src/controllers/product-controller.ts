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
export async function getAllProducts(req: Request, res: Response) {
  try{
    const products = await productService.getAllProducts();
    return res.status(httpStatus.OK).send(products);
  }catch(error){
    return res.status(httpStatus.BAD_REQUEST).send({});
  }
}

export async function updateProduct(req: Request, res:Response) {
  const { productId, updatedData} = req.body;
  try{
    const update = await productService.updateProduct(productId, updatedData);
    return res.status(httpStatus.OK).send(update)
  }catch(error){
    
    return res.status(httpStatus.BAD_REQUEST).send({});
  }
  
}

export async function deletedProduct(req: Request, res:Response) {
  const {productId} = req.body;
  try{
    const deleted = await productService.deletedProduct(productId);
    return res.status(httpStatus.OK).send(deleted);
  }catch(error){
    return res.status(httpStatus.BAD_REQUEST).send({});
  }
  
}