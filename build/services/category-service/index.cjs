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

// src/services/category-service/index.ts
var category_service_exports = {};
__export(category_service_exports, {
  default: () => category_service_default
});
module.exports = __toCommonJS(category_service_exports);

// src/errors/not-found-error.ts
function notFoundError() {
  return {
    name: "NotFoundError",
    message: "No result for this search!"
  };
}

// src/repositories/category-repository/index.ts
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
