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

// src/routes/user-router.ts
var user_router_exports = {};
__export(user_router_exports, {
  userRouter: () => userRouter
});
module.exports = __toCommonJS(user_router_exports);
var import_express = require("express");

// src/middlewares/validation.middleware.ts
var import_http_status = __toESM(require("http-status"), 1);

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
      res.status(import_http_status.default.BAD_REQUEST).send(invalidDataError(error.details.map((d) => d.message)));
      console.log(error.message);
    }
  };
}

// src/controllers/user-controller.ts
var import_http_status2 = __toESM(require("http-status"), 1);

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
    return res.status(import_http_status2.default.CREATED).json({
      id: user.id,
      nome: user.nome,
      email: user.email
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(import_http_status2.default.CONFLICT).send(error);
    }
    return res.status(import_http_status2.default.BAD_REQUEST).send(error);
  }
}

// src/schemas/user-schemas.ts
var import_joi = __toESM(require("joi"), 1);
var createUserSchema = import_joi.default.object({
  nome: import_joi.default.string().min(3).required(),
  email: import_joi.default.string().email().required(),
  password: import_joi.default.string().min(6).required()
});

// src/routes/user-router.ts
var userRouter = (0, import_express.Router)();
userRouter.post("/", validateBody(createUserSchema), userPost);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userRouter
});
