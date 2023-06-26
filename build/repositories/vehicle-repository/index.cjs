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

// src/repositories/vehicle-repository/index.ts
var vehicle_repository_exports = {};
__export(vehicle_repository_exports, {
  default: () => vehicle_repository_default
});
module.exports = __toCommonJS(vehicle_repository_exports);
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
