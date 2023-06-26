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

// src/controllers/fitFor-controller.ts
var fitFor_controller_exports = {};
__export(fitFor_controller_exports, {
  createFitFor: () => createFitFor3
});
module.exports = __toCommonJS(fitFor_controller_exports);
var import_http_status = __toESM(require("http-status"), 1);

// src/errors/not-found-error.ts
function notFoundError() {
  return {
    name: "NotFoundError",
    message: "No result for this search!"
  };
}

// src/repositories/fitFor-repository/index.ts
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
    return res.status(import_http_status.default.OK).send(result);
  } catch (error) {
    if (error.name === "AlreadyExists") {
      return res.status(import_http_status.default.CONFLICT).send({ message: "Already exists" });
    } else {
      return res.status(import_http_status.default.BAD_REQUEST).send({});
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createFitFor
});
