


import { notFoundError } from '../../errors/not-found-error';
import productRepository from '../../repositories/product-repository';

async function createProduct(nome: string, codigoProduto: string, marcaProduto: string, codigoFabricante: string, categoriaProdutoId: number, versaoCarroId: number) {
  console.log('service');
  const product = await productRepository.createProduct(nome, codigoProduto, marcaProduto, codigoFabricante, categoriaProdutoId, versaoCarroId );
  console.log('passou34');

  if (!product) throw notFoundError();

  return product;
}

const productService = {
  createProduct
};
export default productService;
