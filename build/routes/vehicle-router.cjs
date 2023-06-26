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

// src/routes/vehicle-router.ts
var vehicle_router_exports = {};
__export(vehicle_router_exports, {
  vehicleRouter: () => vehicleRouter
});
module.exports = __toCommonJS(vehicle_router_exports);
var import_express = require("express");

// src/controllers/vehicle-controller.ts
var import_http_status = __toESM(require("http-status"), 1);

// src/errors/not-found-error.ts
function notFoundError() {
  return {
    name: "NotFoundError",
    message: "No result for this search!"
  };
}

// src/repositories/vehicle-repository/index.ts
var import_diacritics = __toESM(require("diacritics"), 1);

// src/configs/database.connection.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var database_connection_default = prisma;

// src/errors/already-exists.ts
function AlreadyExists() {
  return {
    name: "AlreadyExists"
  };
}

// src/repositories/vehicle-repository/index.ts
async function registerBrand(imagem, nome) {
  const normalizedCategoryName = import_diacritics.default.remove(nome.toLowerCase());
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
  const normalizedModelName = import_diacritics.default.remove(nome.toLowerCase());
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
  const normalizedVersionName = import_diacritics.default.remove(nome.toLowerCase());
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
    return res.status(import_http_status.default.OK).send(result);
  } catch (error) {
    if (error.name === "AlreadyExists") {
      return res.status(import_http_status.default.CONFLICT).send({ message: "Brand already exists" });
    } else {
      return res.status(import_http_status.default.BAD_REQUEST).send({});
    }
  }
}
async function getAllBrands3(req, res) {
  try {
    const categories = await vehicle_service_default.getAllBrands();
    return res.status(import_http_status.default.OK).send(categories);
  } catch (error) {
    return res.status(import_http_status.default.INTERNAL_SERVER_ERROR).send({});
  }
}
async function registerModel3(req, res) {
  const { nome, marcaId, imagem } = req.body;
  try {
    const result = await vehicle_service_default.registerModel({ nome, marcaId, imagem });
    if (result === "AlreadyExists") {
      return res.status(import_http_status.default.CONFLICT).send({ message: "Model already exists" });
    }
    return res.status(import_http_status.default.OK).send(result);
  } catch (error) {
    return res.status(import_http_status.default.BAD_REQUEST).send({});
  }
}
async function getAllModels3(req, res) {
  try {
    const models = await vehicle_service_default.getAllModels();
    return res.status(import_http_status.default.OK).send(models);
  } catch (error) {
    return res.status(import_http_status.default.INTERNAL_SERVER_ERROR).send({});
  }
}
async function getModelsByVehicleId2(req, res) {
  const vehicleId = req.params.id;
  const numberVehicleId = Number(vehicleId);
  try {
    const models = await vehicle_service_default.getModelByVehicleId(numberVehicleId);
    return res.status(import_http_status.default.OK).send(models);
  } catch (error) {
    return res.status(import_http_status.default.INTERNAL_SERVER_ERROR).send({});
  }
}
async function registerVersion3(req, res) {
  const { nome, modeloId, ano, imagem, observacoes } = req.body;
  try {
    const result = await vehicle_service_default.registerVersion({ nome, modeloId, imagem, ano, observacoes });
    if (result === "AlreadyExists") {
      return res.status(import_http_status.default.CONFLICT).send({ message: "Version already exists" });
    }
    return res.status(import_http_status.default.OK).send(result);
  } catch (error) {
    return res.status(import_http_status.default.BAD_REQUEST).send({});
  }
}
async function getAllVersions3(req, res) {
  try {
    const versions = await vehicle_service_default.getAllVersions();
    return res.status(import_http_status.default.OK).send(versions);
  } catch (error) {
    return res.status(import_http_status.default.INTERNAL_SERVER_ERROR).send({});
  }
}
async function getVersionByModelId3(req, res) {
  const marcaId = req.params.id;
  console.log(marcaId);
  const numberModelId = Number(marcaId);
  try {
    const version = await vehicle_service_default.getModelByVehicleId(numberModelId);
    console.log(version);
    return res.status(import_http_status.default.OK).send(version);
  } catch (error) {
    return res.status(import_http_status.default.INTERNAL_SERVER_ERROR).send({});
  }
}

// src/routes/vehicle-router.ts
var vehicleRouter = (0, import_express.Router)();
vehicleRouter.post("/", createBrand2);
vehicleRouter.get("/", getAllBrands3);
vehicleRouter.post("/model", registerModel3);
vehicleRouter.get("/model", getAllModels3);
vehicleRouter.get("/model/:id", getModelsByVehicleId2);
vehicleRouter.post("/model/version", registerVersion3);
vehicleRouter.get("/model/version", getAllVersions3);
vehicleRouter.get("/model/version/:id", getVersionByModelId3);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  vehicleRouter
});
