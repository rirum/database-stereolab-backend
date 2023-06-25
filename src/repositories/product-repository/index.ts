import {versao_produtos} from '@prisma/client'



import prisma from '../../configs/database.connection';



async function createProduct(nome: string, codigoProduto: string, marcaProduto: string, codigoFabricante: string, categoriaProdutoId: number, versaoCarroId: number) {
  const produto = await prisma.produto.create({
    data: {
      nome,
      codigo_produto: codigoProduto,
      marca_produto: marcaProduto,
      codigo_fabricante: codigoFabricante,
      categoria_produto: {connect: {id: categoriaProdutoId}},
      versao_produtos: {
        create: {
          versao_carro: {connect: {id:versaoCarroId}}
        }
      }
    }
  });

  return produto;

}

async function createVersaoProduto(versaoId: number, produtoId: number) {
  
  const versaoProduto = await prisma.versao_produtos.create({
    data: {
      versao_carro: {connect: {id: versaoId}},
      produto: {connect: {id: produtoId}} 
    }
  });
}


  

const productRepository = {
  createProduct
};
export default productRepository;
