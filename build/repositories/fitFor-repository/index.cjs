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

// src/repositories/fitFor-repository/index.ts
var fitFor_repository_exports = {};
__export(fitFor_repository_exports, {
  default: () => fitFor_repository_default
});
module.exports = __toCommonJS(fitFor_repository_exports);
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

// src/repositories/fitFor-repository/index.ts
async function createFitFor(nome) {
  const normalizedName = import_diacritics.default.remove(nome.toLowerCase());
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
