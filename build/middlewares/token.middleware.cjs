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

// src/middlewares/token.middleware.ts
var token_middleware_exports = {};
__export(token_middleware_exports, {
  default: () => token_middleware_default
});
module.exports = __toCommonJS(token_middleware_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);

// src/errors/index.ts
var createError = (status, name, message) => ({
  status,
  name,
  message
});
var unauthorizedError = () => createError(401, "UnauthorizedError", "You are not authorized to perform this action.");
var invalidCredentialsError = () => createError(401, "InvalidCredentialsError", "Incorrect email or password.");
var notFoundError = (resource) => createError(404, "NotFoundError", `No ${resource} found.`);
var duplicatedError = () => createError(409, "DuplicatedError", "Duplicate resource found");
var unprocessableEntityError = (message) => createError(422, "UnprocessableEntityError", `Invalid request data: ${message}`);
var errors_default = {
  unauthorizedError,
  notFoundError,
  invalidCredentialsError,
  duplicatedError,
  unprocessableEntityError
};

// src/middlewares/token.middleware.ts
var import_config = require("dotenv/config");
var tokenMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1]?.trim();
  if (!token)
    throw errors_default.unauthorizedError();
  try {
    const { userId } = import_jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
    res.locals.userId = userId;
  } catch {
    throw errors_default.unauthorizedError();
  }
  next();
};
var token_middleware_default = tokenMiddleware;
