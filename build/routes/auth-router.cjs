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

// src/routes/auth-router.ts
var auth_router_exports = {};
__export(auth_router_exports, {
  authRouter: () => authRouter
});
module.exports = __toCommonJS(auth_router_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authRouter
});
