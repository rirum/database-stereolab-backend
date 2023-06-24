import httpStatus from 'http-status';

import { Request, Response } from 'express';

import { CreateProductParams } from '../@types/product.type';
import productService from '../services/product-service';

export async function createProduct(req: Request, res: Response) {
  const {
    nome,
    codigo_produto,
    marca_produto,
    codigo_fabricante,
    codigo_fabricante_3,
    codigo_fabricante_2,
    categoria_produto_id,
    aplicacoes_id,
    createdAt,
    updatedAt,
    observacoes,
    acessorios_id,
    precoFinal,
    precoCusto,
    imagem,
    imagem2,
    link,
    imagem3,
    instalada,
    medidas,
    versoes_carro
  }: CreateProductParams = req.body;

  try {
    const product = await productService.createProduct(nome, {
      nome,
      codigo_produto,
      marca_produto,
      codigo_fabricante,
      codigo_fabricante_3,
      codigo_fabricante_2,
      categoria_produto_id,
      aplicacoes_id,
      createdAt,
      updatedAt,
      observacoes,
      acessorios_id,
      precoFinal,
      precoCusto,
      imagem,
      imagem2,
      link,
      imagem3,
      instalada,
      medidas,
      versoes_carro
    });

    return res.status(httpStatus.OK).send(product);
  } catch (error) {
    if (error.name === 'AlreadyExists') {
      return res.status(httpStatus.CONFLICT).send({ message: 'Product already exists' });
    } else {
      return res.status(httpStatus.BAD_REQUEST).send({});
    }
  }
}
