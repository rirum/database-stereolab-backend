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

// src/controllers/user-controller.ts
var user_controller_exports = {};
__export(user_controller_exports, {
  userPost: () => userPost
});
module.exports = __toCommonJS(user_controller_exports);
var import_http_status = __toESM(require("http-status"), 1);

// src/services/users-service/index.ts
var import_bcrypt = __toESM(require("bcrypt"), 1);

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

// src/services/users-service/index.ts
async function createUser2({ nome, email, password }) {
  const hashedPassword = await import_bcrypt.default.hash(password, 12);
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
    return res.status(import_http_status.default.CREATED).json({
      id: user.id,
      nome: user.nome,
      email: user.email
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(import_http_status.default.CONFLICT).send(error);
    }
    return res.status(import_http_status.default.BAD_REQUEST).send(error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userPost
});
