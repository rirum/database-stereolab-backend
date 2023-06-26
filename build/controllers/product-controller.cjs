"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/product-controller.ts
var product_controller_exports = {};
__export(product_controller_exports, {
  createProduct: () => createProduct3,
  deletedProduct: () => deletedProduct2,
  getAllProducts: () => getAllProducts3,
  updateProduct: () => updateProduct3
});
module.exports = __toCommonJS(product_controller_exports);
var import_http_status = __toESM(require("http-status"), 1);

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
  const deletedProduct3 = await database_connection_default.produto.delete({
    where: { id: productId }
  });
  return deletedProduct3;
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
  const deletedProduct3 = await product_repository_default.deleteProduct(productId);
  if (!deletedProduct3) {
    throw new Error("Produto n\xE3o encontrado");
  }
  return deletedProduct3;
}
var productService = {
  createProduct: createProduct2,
  getAllProducts: getAllProducts2,
  updateProduct: updateProduct2,
  deletedProduct
};
var product_service_default = productService;

// src/controllers/product-controller.ts
async function createProduct3(req, res) {
  const {
    nome,
    codigoProduto,
    marcaProduto,
    codigoFabricante,
    categoriaProdutoId,
    versaoCarroId
  } = req.body;
  try {
    const product = await product_service_default.createProduct(
      nome,
      codigoProduto,
      marcaProduto,
      codigoFabricante,
      categoriaProdutoId,
      versaoCarroId
    );
    return res.status(import_http_status.default.OK).send(product);
  } catch (error) {
    if (error.name === "AlreadyExists") {
      return res.status(import_http_status.default.CONFLICT).send({ message: "Product already exists" });
    } else {
      return res.status(import_http_status.default.BAD_REQUEST).send({});
    }
  }
}
async function getAllProducts3(req, res) {
  try {
    const products = await product_service_default.getAllProducts();
    return res.status(import_http_status.default.OK).send(products);
  } catch (error) {
    return res.status(import_http_status.default.BAD_REQUEST).send({});
  }
}
async function updateProduct3(req, res) {
  const { productId, updatedData } = req.body;
  try {
    const update = await product_service_default.updateProduct(productId, updatedData);
    return res.status(import_http_status.default.OK).send(update);
  } catch (error) {
    return res.status(import_http_status.default.BAD_REQUEST).send({});
  }
}
async function deletedProduct2(req, res) {
  const { productId } = req.body;
  try {
    const deleted = await product_service_default.deletedProduct(productId);
    return res.status(import_http_status.default.OK).send(deleted);
  } catch (error) {
    return res.status(import_http_status.default.BAD_REQUEST).send({});
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createProduct,
  deletedProduct,
  getAllProducts,
  updateProduct
});
