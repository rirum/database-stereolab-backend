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

// src/app.ts
var app_exports = {};
__export(app_exports, {
  default: () => app_default
});
module.exports = __toCommonJS(app_exports);
var import_express_async_errors = require("express-async-errors");
var import_cors = __toESM(require("cors"), 1);
var import_helmet = __toESM(require("helmet"), 1);
var import_express8 = __toESM(require("express"), 1);

// src/configs/loadEnvs.ts
var import_dotenv = __toESM(require("dotenv"), 1);
var import_dotenv_expand = __toESM(require("dotenv-expand"), 1);
function loadEnv() {
  const path = `envs/.env.${process.env.NODE_ENV}`;
  const currentEnvs = import_dotenv.default.config({ path });
  import_dotenv_expand.default.expand(currentEnvs);
}

// src/middlewares/error.middleware.ts
var handleApplicationErrors = (err, req, res, _next) => {
  if (err.status) {
    return res.status(err.status).send({ name: err.name, message: err.message });
  }
  console.log(err);
  return res.status(500).send({
    message: "Internal Server Error"
  });
};
var error_middleware_default = handleApplicationErrors;

// src/routes/index.ts
var import_express7 = require("express");

// src/routes/auth-router.ts
var import_express = require("express");

// src/controllers/auth-controller.ts
var import_http_status = __toESM(require("http-status"), 1);

// src/services/auth-service/index.ts
var import_bcrypt = __toESM(require("bcrypt"), 1);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);

// src/services/auth-service/errors.ts
function invalidCredentialError() {
  return {
    name: "InvalidCredentialsError",
    message: "email or password are incorrect"
  };
}

// src/configs/database.connection.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var database_connection_default = prisma;

// src/repositories/user-repository/index.ts
async function createUser(data) {
  return database_connection_default.usuarios.create({
    data
  });
}
async function findByEmail(email) {
  const params = {
    where: {
      email
    }
  };
  return database_connection_default.usuarios.findUnique(params);
}
var userRepository = {
  createUser,
  findByEmail
};
var user_repository_default = userRepository;

// src/repositories/auth-repository/index.ts
async function signIn(data) {
  return database_connection_default.sessao.create({
    data
  });
}
var sessionRepository = {
  signIn
};
var auth_repository_default = sessionRepository;

// src/services/auth-service/index.ts
var import_config = require("dotenv/config");
async function signIn2(email, password) {
  const user = await findEmail(email);
  await validatePassword(password, user.password);
  const token = await createSession(user.id);
  const response = {
    id: user.id,
    email: user.email,
    token
  };
  return response;
}
async function findEmail(email) {
  const verifyEmail = await user_repository_default.findByEmail(email);
  if (!verifyEmail) {
    throw invalidCredentialError();
  }
  return verifyEmail;
}
async function validatePassword(password, userPassword) {
  const validPassword = await import_bcrypt.default.compare(password, userPassword);
  if (!validPassword)
    throw invalidCredentialError();
}
async function createSession(userId) {
  const token = import_jsonwebtoken.default.sign({ userId }, process.env.JWT_SECRET);
  const user_id = userId;
  await auth_repository_default.signIn({
    token,
    user_id
  });
  return token;
}
var authService = {
  signIn: signIn2,
  createSession
};
var auth_service_default = authService;

// src/controllers/auth-controller.ts
async function signIn3(req, res) {
  const { email, password } = req.body;
  try {
    const result = await auth_service_default.signIn(email, password);
    return res.status(import_http_status.default.OK).send(result);
  } catch (error) {
    return res.status(import_http_status.default.UNAUTHORIZED).send({});
  }
}

// src/middlewares/validation.middleware.ts
var import_http_status2 = __toESM(require("http-status"), 1);

// src/errors/invalid-data-error.ts
function invalidDataError(details) {
  return {
    name: "InvalidDataError",
    message: "Invalid data",
    details
  };
}

// src/middlewares/validation.middleware.ts
function validateBody(schema) {
  return validate(schema, "body");
}
function validate(schema, type) {
  return (req, res, next) => {
    const { error } = schema.validate(req[type], {
      abortEarly: false
    });
    if (!error) {
      next();
    } else {
      res.status(import_http_status2.default.BAD_REQUEST).send(invalidDataError(error.details.map((d) => d.message)));
      console.log(error.message);
    }
  };
}

// src/schemas/auth-schema.ts
var import_joi = __toESM(require("joi"), 1);
var signInSchema = import_joi.default.object({
  email: import_joi.default.string().email().required(),
  password: import_joi.default.string().required()
});

// src/routes/auth-router.ts
var authRouter = (0, import_express.Router)();
authRouter.post("/", validateBody(signInSchema), signIn3);

// src/routes/category-router.ts
var import_express2 = require("express");

// src/controllers/category-controller.ts
var import_http_status3 = __toESM(require("http-status"), 1);

// src/errors/not-found-error.ts
function notFoundError() {
  return {
    name: "NotFoundError",
    message: "No result for this search!"
  };
}

// src/repositories/category-repository/index.ts
var import_diacritics = __toESM(require("diacritics"), 1);

// src/errors/already-exists.ts
function AlreadyExists() {
  return {
    name: "AlreadyExists"
  };
}

// src/repositories/category-repository/index.ts
async function registerCategory(nome) {
  const normalizedCategoryName = import_diacritics.default.remove(nome.toLowerCase());
  const existingCategory = await database_connection_default.categoria_produto.findUnique({
    where: {
      nome: normalizedCategoryName
    }
  });
  if (existingCategory) {
    throw AlreadyExists();
  }
  const category = await database_connection_default.categoria_produto.create({
    data: {
      nome: normalizedCategoryName
    }
  });
  return category;
}
async function getAllCategories() {
  const categories = await database_connection_default.categoria_produto.findMany();
  return categories;
}
var registerRepository = {
  registerCategory,
  getAllCategories
};
var category_repository_default = registerRepository;

// src/services/category-service/index.ts
async function createCategory(params) {
  const category = await category_repository_default.registerCategory(params.nome);
  if (!category)
    throw notFoundError();
  return category;
}
async function getAllCategories2() {
  const categories = await category_repository_default.getAllCategories();
  return categories;
}
var categoryService = {
  createCategory,
  getAllCategories: getAllCategories2
};
var category_service_default = categoryService;

// src/controllers/category-controller.ts
async function createCategory2(req, res) {
  const { nome } = req.body;
  try {
    const result = await category_service_default.createCategory({ nome });
    return res.status(import_http_status3.default.OK).send(result);
  } catch (error) {
    if (error.name === "AlreadyExists") {
      return res.status(import_http_status3.default.CONFLICT).send({ message: "Category already exists" });
    } else {
      return res.status(import_http_status3.default.BAD_REQUEST).send({});
    }
  }
}
async function getAllCategories3(req, res) {
  try {
    const categories = await category_service_default.getAllCategories();
    return res.status(import_http_status3.default.OK).send(categories);
  } catch (error) {
    return res.status(import_http_status3.default.INTERNAL_SERVER_ERROR).send({});
  }
}

// src/routes/category-router.ts
var categoryRouter = (0, import_express2.Router)();
categoryRouter.post("/", createCategory2);
categoryRouter.get("/", getAllCategories3);

// src/routes/fitFor-router.ts
var import_express3 = require("express");

// src/controllers/fitFor-controller.ts
var import_http_status4 = __toESM(require("http-status"), 1);

// src/repositories/fitFor-repository/index.ts
var import_diacritics2 = __toESM(require("diacritics"), 1);
async function createFitFor(nome) {
  const normalizedName = import_diacritics2.default.remove(nome.toLowerCase());
  const existingFit = await database_connection_default.aplicacoes.findUnique({
    where: {
      nome: normalizedName
    }
  });
  if (existingFit) {
    throw AlreadyExists();
  }
  const fitFor = await database_connection_default.aplicacoes.create({
    data: {
      nome: normalizedName
    }
  });
  return fitFor;
}
async function getAllFitFor() {
  const allFitFor = await database_connection_default.aplicacoes.findMany();
  return allFitFor;
}
var fitForRepository = {
  createFitFor,
  getAllFitFor
};
var fitFor_repository_default = fitForRepository;

// src/services/fitFor-service/index.ts
async function createFitFor2(nome) {
  const fitFor = await fitFor_repository_default.createFitFor(nome);
  if (!fitFor)
    throw notFoundError();
  return fitFor;
}
var fitForService = {
  createFitFor: createFitFor2
};
var fitFor_service_default = fitForService;

// src/controllers/fitFor-controller.ts
async function createFitFor3(req, res) {
  const { nome } = req.body;
  try {
    const result = await fitFor_service_default.createFitFor(nome);
    return res.status(import_http_status4.default.OK).send(result);
  } catch (error) {
    if (error.name === "AlreadyExists") {
      return res.status(import_http_status4.default.CONFLICT).send({ message: "Already exists" });
    } else {
      return res.status(import_http_status4.default.BAD_REQUEST).send({});
    }
  }
}

// src/routes/fitFor-router.ts
var fitForRouter = (0, import_express3.Router)();
fitForRouter.post("/", createFitFor3);

// src/routes/product-router.ts
var import_express4 = require("express");

// src/controllers/product-controller.ts
var import_http_status5 = __toESM(require("http-status"), 1);

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
    return res.status(import_http_status5.default.OK).send(product);
  } catch (error) {
    if (error.name === "AlreadyExists") {
      return res.status(import_http_status5.default.CONFLICT).send({ message: "Product already exists" });
    } else {
      return res.status(import_http_status5.default.BAD_REQUEST).send({});
    }
  }
}
async function getAllProducts3(req, res) {
  try {
    const products = await product_service_default.getAllProducts();
    return res.status(import_http_status5.default.OK).send(products);
  } catch (error) {
    return res.status(import_http_status5.default.BAD_REQUEST).send({});
  }
}
async function updateProduct3(req, res) {
  const { productId, updatedData } = req.body;
  try {
    const update = await product_service_default.updateProduct(productId, updatedData);
    return res.status(import_http_status5.default.OK).send(update);
  } catch (error) {
    return res.status(import_http_status5.default.BAD_REQUEST).send({});
  }
}
async function deletedProduct2(req, res) {
  const { productId } = req.body;
  try {
    const deleted = await product_service_default.deletedProduct(productId);
    return res.status(import_http_status5.default.OK).send(deleted);
  } catch (error) {
    return res.status(import_http_status5.default.BAD_REQUEST).send({});
  }
}

// src/routes/product-router.ts
var productRouter = (0, import_express4.Router)();
productRouter.post("/", createProduct3);
productRouter.get("/", getAllProducts3);
productRouter.put("/", updateProduct3);
productRouter.delete("/", deletedProduct2);

// src/routes/user-router.ts
var import_express5 = require("express");

// src/controllers/user-controller.ts
var import_http_status6 = __toESM(require("http-status"), 1);

// src/services/users-service/index.ts
var import_bcrypt2 = __toESM(require("bcrypt"), 1);
async function createUser2({ nome, email, password }) {
  const hashedPassword = await import_bcrypt2.default.hash(password, 12);
  return user_repository_default.createUser({
    nome,
    email,
    password: hashedPassword
  });
}
var userService = {
  createUser: createUser2
};
var users_service_default = userService;

// src/controllers/user-controller.ts
async function userPost(req, res) {
  const { nome, password, email } = req.body;
  try {
    const user = await users_service_default.createUser({ nome, email, password });
    return res.status(import_http_status6.default.CREATED).json({
      id: user.id,
      nome: user.nome,
      email: user.email
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(import_http_status6.default.CONFLICT).send(error);
    }
    return res.status(import_http_status6.default.BAD_REQUEST).send(error);
  }
}

// src/schemas/user-schemas.ts
var import_joi2 = __toESM(require("joi"), 1);
var createUserSchema = import_joi2.default.object({
  nome: import_joi2.default.string().min(3).required(),
  email: import_joi2.default.string().email().required(),
  password: import_joi2.default.string().min(6).required()
});

// src/routes/user-router.ts
var userRouter = (0, import_express5.Router)();
userRouter.post("/", validateBody(createUserSchema), userPost);

// src/routes/vehicle-router.ts
var import_express6 = require("express");

// src/controllers/vehicle-controller.ts
var import_http_status7 = __toESM(require("http-status"), 1);

// src/repositories/vehicle-repository/index.ts
var import_diacritics3 = __toESM(require("diacritics"), 1);
async function registerBrand(imagem, nome) {
  const normalizedCategoryName = import_diacritics3.default.remove(nome.toLowerCase());
  const existingCategory = await database_connection_default.marca_carro.findUnique({
    where: {
      nome: normalizedCategoryName
    }
  });
  if (existingCategory) {
    throw AlreadyExists();
  }
  const category = await database_connection_default.marca_carro.create({
    data: {
      imagem,
      nome: normalizedCategoryName
    }
  });
  return category;
}
async function getAllBrands() {
  const brands = await database_connection_default.marca_carro.findMany();
  return brands;
}
async function registerModel(nome, marcaId, imagem) {
  const normalizedModelName = import_diacritics3.default.remove(nome.toLowerCase());
  const existingModel = await database_connection_default.modelo_carro.findUnique({
    where: {
      nome: normalizedModelName
    }
  });
  if (existingModel) {
    return "AlreadyExists";
  }
  const model = await database_connection_default.modelo_carro.create({
    data: {
      imagem,
      nome: normalizedModelName,
      marca_carro: {
        connect: {
          id: marcaId
        }
      }
    }
  });
  return model;
}
async function getAllModels() {
  const models = await database_connection_default.modelo_carro.findMany();
  return models;
}
async function getModelsByVehicleId(vehicleId) {
  const models = await database_connection_default.modelo_carro.findMany({
    where: { marca_id: vehicleId }
  });
  return models;
}
async function registerVersion(nome, modeloId, ano, observacoes, imagem) {
  const normalizedVersionName = import_diacritics3.default.remove(nome.toLowerCase());
  const existingVersion = await database_connection_default.versao_carro.findUnique({
    where: {
      nome: normalizedVersionName
    }
  });
  if (existingVersion) {
    return "AlreadyExists";
  }
  const version = await database_connection_default.versao_carro.create({
    data: {
      imagem,
      nome: normalizedVersionName,
      ano,
      observacoes,
      modelo_carro: {
        connect: {
          id: modeloId
        }
      }
    }
  });
  return version;
}
async function getVersionByModelId(marcaId) {
  const models = await database_connection_default.versao_carro.findMany({
    where: { modelo_id: marcaId }
  });
  return models;
}
async function getAllVersions() {
  const versions = await database_connection_default.versao_carro.findMany();
  return versions;
}
var vehicleRepository = {
  registerBrand,
  getAllBrands,
  registerModel,
  getAllModels,
  getModelsByVehicleId,
  registerVersion,
  getAllVersions,
  getVersionByModelId
};
var vehicle_repository_default = vehicleRepository;

// src/services/vehicle-service/index.ts
async function createBrand(params) {
  const brand = await vehicle_repository_default.registerBrand(params.imagem, params.nome);
  if (!brand)
    throw notFoundError();
  return brand;
}
async function getAllBrands2() {
  const brands = await vehicle_repository_default.getAllBrands();
  return brands;
}
async function registerModel2(params) {
  try {
    const model = await vehicle_repository_default.registerModel(params.nome, params.marcaId, params.imagem);
    if (!model)
      throw notFoundError();
    return model;
  } catch (error) {
    console.log(error);
  }
}
async function getAllModels2() {
  const models = await vehicle_repository_default.getAllModels();
  return models;
}
async function getModelByVehicleId(vehicleId) {
  const models = await vehicle_repository_default.getModelsByVehicleId(vehicleId);
  return models;
}
async function getAllVersions2() {
  const versions = await vehicle_repository_default.getAllVersions();
  return versions;
}
async function getVersionByModelId2(marcaId) {
  const models = await vehicle_repository_default.getVersionByModelId(marcaId);
  return models;
}
async function registerVersion2(params) {
  try {
    const version = await vehicle_repository_default.registerVersion(
      params.nome,
      params.modeloId,
      params.ano,
      params.observacoes,
      params.imagem
    );
    if (!version)
      throw notFoundError();
    return version;
  } catch (error) {
    console.log(error);
  }
}
var vehicleService = {
  createBrand,
  getAllBrands: getAllBrands2,
  registerModel: registerModel2,
  getAllModels: getAllModels2,
  getModelByVehicleId,
  registerVersion: registerVersion2,
  getAllVersions: getAllVersions2,
  getVersionByModelId: getVersionByModelId2
};
var vehicle_service_default = vehicleService;

// src/controllers/vehicle-controller.ts
async function createBrand2(req, res) {
  const { imagem, nome } = req.body;
  try {
    const result = await vehicle_service_default.createBrand({ imagem, nome });
    return res.status(import_http_status7.default.OK).send(result);
  } catch (error) {
    if (error.name === "AlreadyExists") {
      return res.status(import_http_status7.default.CONFLICT).send({ message: "Brand already exists" });
    } else {
      return res.status(import_http_status7.default.BAD_REQUEST).send({});
    }
  }
}
async function getAllBrands3(req, res) {
  try {
    const categories = await vehicle_service_default.getAllBrands();
    return res.status(import_http_status7.default.OK).send(categories);
  } catch (error) {
    return res.status(import_http_status7.default.INTERNAL_SERVER_ERROR).send({});
  }
}
async function registerModel3(req, res) {
  const { nome, marcaId, imagem } = req.body;
  try {
    const result = await vehicle_service_default.registerModel({ nome, marcaId, imagem });
    if (result === "AlreadyExists") {
      return res.status(import_http_status7.default.CONFLICT).send({ message: "Model already exists" });
    }
    return res.status(import_http_status7.default.OK).send(result);
  } catch (error) {
    return res.status(import_http_status7.default.BAD_REQUEST).send({});
  }
}
async function getAllModels3(req, res) {
  try {
    const models = await vehicle_service_default.getAllModels();
    return res.status(import_http_status7.default.OK).send(models);
  } catch (error) {
    return res.status(import_http_status7.default.INTERNAL_SERVER_ERROR).send({});
  }
}
async function getModelsByVehicleId2(req, res) {
  const vehicleId = req.params.id;
  const numberVehicleId = Number(vehicleId);
  try {
    const models = await vehicle_service_default.getModelByVehicleId(numberVehicleId);
    return res.status(import_http_status7.default.OK).send(models);
  } catch (error) {
    return res.status(import_http_status7.default.INTERNAL_SERVER_ERROR).send({});
  }
}
async function registerVersion3(req, res) {
  const { nome, modeloId, ano, imagem, observacoes } = req.body;
  try {
    const result = await vehicle_service_default.registerVersion({ nome, modeloId, imagem, ano, observacoes });
    if (result === "AlreadyExists") {
      return res.status(import_http_status7.default.CONFLICT).send({ message: "Version already exists" });
    }
    return res.status(import_http_status7.default.OK).send(result);
  } catch (error) {
    return res.status(import_http_status7.default.BAD_REQUEST).send({});
  }
}
async function getAllVersions3(req, res) {
  try {
    const versions = await vehicle_service_default.getAllVersions();
    return res.status(import_http_status7.default.OK).send(versions);
  } catch (error) {
    return res.status(import_http_status7.default.INTERNAL_SERVER_ERROR).send({});
  }
}
async function getVersionByModelId3(req, res) {
  const marcaId = req.params.id;
  console.log(marcaId);
  const numberModelId = Number(marcaId);
  try {
    const version = await vehicle_service_default.getModelByVehicleId(numberModelId);
    console.log(version);
    return res.status(import_http_status7.default.OK).send(version);
  } catch (error) {
    return res.status(import_http_status7.default.INTERNAL_SERVER_ERROR).send({});
  }
}

// src/routes/vehicle-router.ts
var vehicleRouter = (0, import_express6.Router)();
vehicleRouter.post("/", createBrand2);
vehicleRouter.get("/", getAllBrands3);
vehicleRouter.post("/model", registerModel3);
vehicleRouter.get("/model", getAllModels3);
vehicleRouter.get("/model/:id", getModelsByVehicleId2);
vehicleRouter.post("/model/version", registerVersion3);
vehicleRouter.get("/model/version", getAllVersions3);
vehicleRouter.get("/model/version/:id", getVersionByModelId3);

// src/routes/index.ts
var routes = (0, import_express7.Router)();
routes.use("/user", userRouter);
routes.use("/sign-in", authRouter);
routes.use("/category", categoryRouter);
routes.use("/vehicle", vehicleRouter);
routes.use("/product", productRouter);
routes.use("/fitfor", fitForRouter);
var routes_default = routes;

// src/app.ts
loadEnv();
var app = (0, import_express8.default)();
app.use((0, import_cors.default)());
app.use((0, import_express8.json)());
app.use((0, import_helmet.default)());
app.get("/health", (_req, res) => res.send("OK!"));
app.use(routes_default);
app.use(error_middleware_default);
var app_default = app;
