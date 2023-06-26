"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/services/product-service/index.ts
var product_service_exports = {};
__export(product_service_exports, {
  default: () => product_service_default
});
module.exports = __toCommonJS(product_service_exports);

// src/errors/not-found-error.ts
function notFoundError() {
  return {
    name: "NotFoundError",
    message: "No result for this search!"
  };
}

// src/configs/database.connection.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var database_connection_default = prisma;

// src/repositories/product-repository/index.ts
async function createProduct(nome, codigoProduto, marcaProduto, codigoFabricante, categoriaProdutoId, versaoCarroId) {
  const produto = await database_connection_default.produto.create({
    data: {
      nome,
      codigo_produto: codigoProduto,
      marca_produto: marcaProduto,
      codigo_fabricante: codigoFabricante,
      categoria_produto: { connect: { id: categoriaProdutoId } },
      versao_produtos: {
        create: {
          versao_carro: { connect: { id: versaoCarroId } }
        }
      }
    }
  });
  return produto;
}
async function getAllProducts() {
  const products = await database_connection_default.produto.findMany({
    include: {
      categoria_produto: true,
      versao_produtos: {
        include: {
          versao_carro: true
        }
      }
    }
  });
  return products;
}
async function updateProduct(productId, updatedData) {
  const existingProduct = await database_connection_default.produto.findUnique({
    where: { id: productId },
    include: {
      versao_produtos: true,
      categoria_produto: true
    }
  });
  const updatedProduct = await database_connection_default.produto.update({
    where: { id: productId },
    data: {
      nome: updatedData.nome,
      codigo_produto: updatedData.codigo_produto,
      marca_produto: updatedData.marca_produto,
      codigo_fabricante: updatedData.codigo_fabricante,
      categoria_produto_id: updatedData.categoria_produto_id,
      observacoes: updatedData.observacoes,
      imagem: updatedData.imagem,
      link: updatedData.link
    },
    include: {
      versao_produtos: {
        include: {
          versao_carro: true
        }
      },
      categoria_produto: true
    }
  });
  return updatedProduct;
}
async function deleteProduct(productId) {
  await database_connection_default.versao_produtos.deleteMany({
    where: {
      produto_id: productId
    }
  });
  const deletedProduct2 = await database_connection_default.produto.delete({
    where: { id: productId }
  });
  return deletedProduct2;
}
var productRepository = {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct
};
var product_repository_default = productRepository;

// src/services/product-service/index.ts
async function createProduct2(nome, codigoProduto, marcaProduto, codigoFabricante, categoriaProdutoId, versaoCarroId) {
  const product = await product_repository_default.createProduct(nome, codigoProduto, marcaProduto, codigoFabricante, categoriaProdutoId, versaoCarroId);
  if (!product)
    throw notFoundError();
  return product;
}
async function getAllProducts2() {
  const products = await product_repository_default.getAllProducts();
  return products;
}
async function updateProduct2(productId, updatedData) {
  const update = await product_repository_default.updateProduct(productId, updatedData);
  if (!update) {
    throw new Error("Produto n\xE3o encontrado");
  }
  return update;
}
async function deletedProduct(productId) {
  const deletedProduct2 = await product_repository_default.deleteProduct(productId);
  if (!deletedProduct2) {
    throw new Error("Produto n\xE3o encontrado");
  }
  return deletedProduct2;
}
var productService = {
  createProduct: createProduct2,
  getAllProducts: getAllProducts2,
  updateProduct: updateProduct2,
  deletedProduct
};
var product_service_default = productService;
