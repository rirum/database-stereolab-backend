import { notFoundError } from '../../errors/not-found-error';
import productRepository from '../../repositories/product-repository';

async function createProduct(nome: string, codigoProduto: string, marcaProduto: string, codigoFabricante: string, categoriaProdutoId: number, versaoCarroId: number) {

  const product = await productRepository.createProduct(nome, codigoProduto, marcaProduto, codigoFabricante, categoriaProdutoId, versaoCarroId );


  if (!product) throw notFoundError();

  return product;
}

async function getAllProducts(){
  const products = await productRepository.getAllProducts();
  return products;
}

async function updateProduct(productId:number, updatedData: any){
 
  const update = await productRepository.updateProduct(productId, updatedData);
   if (!update){
    throw new Error('Produto não encontrado');
  }
  
return update;

}

async function deletedProduct(productId: number){
  const deletedProduct = await productRepository.deleteProduct(productId);
  if (!deletedProduct){
    throw new Error('Produto não encontrado');
  }
  return deletedProduct
}
const productService = {
  createProduct,
  getAllProducts,
  updateProduct,
  deletedProduct
};
export default productService;
