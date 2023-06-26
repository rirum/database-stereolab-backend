"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/errors/index.ts
var errors_exports = {};
__export(errors_exports, {
  default: () => errors_default
});
module.exports = __toCommonJS(errors_exports);
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
