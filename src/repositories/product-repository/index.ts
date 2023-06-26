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

async function getAllProducts(){
  const products = await prisma.produto.findMany({
    include: {
      categoria_produto: true,
      versao_produtos: {
        include: {
          versao_carro:true,
        }
      }
    }
  });
  return products
}

async function updateProduct(productId: number, updatedData: any){
  const existingProduct = await prisma.produto.findUnique({
    where:{id: productId},
    include: { versao_produtos: true,
    categoria_produto: true,
    },
  });

  


  const updatedProduct = await prisma.produto.update({
    where:{id: productId},
    data: {
      nome: updatedData.nome,
      codigo_produto: updatedData.codigo_produto,
      marca_produto: updatedData.marca_produto,
      codigo_fabricante: updatedData.codigo_fabricante,
      categoria_produto_id: updatedData.categoria_produto_id,
      observacoes: updatedData.observacoes,
      imagem: updatedData.imagem,
      link: updatedData.link,
      
    },
    include: {
      versao_produtos: {
        include: {
          versao_carro: true,
        },
      },
      categoria_produto: true,
    }

  });

 

  return updatedProduct;
}

async function deleteProduct(productId: number){
  await prisma.versao_produtos.deleteMany({
    where: {
      produto_id: productId,
    }
  });

  const deletedProduct = await prisma.produto.delete({
    where: {id: productId},
  });

  return deletedProduct;
}

  

const productRepository = {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct
};
export default productRepository;
