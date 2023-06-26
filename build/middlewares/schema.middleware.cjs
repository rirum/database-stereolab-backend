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

// src/middlewares/schema.middleware.ts
var schema_middleware_exports = {};
__export(schema_middleware_exports, {
  default: () => schema_middleware_default
});
module.exports = __toCommonJS(schema_middleware_exports);

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

// src/utils/functions/comparePasswords.ts
var import_bcrypt = __toESM(require("bcrypt"), 1);

// src/utils/functions/generateToken.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);

// src/utils/constants/times.ts
var MS_IN_SECOND = 1e3;
var MS_IN_MINUTE = MS_IN_SECOND * 60;
var MS_IN_HOUR = MS_IN_MINUTE * 60;
var MS_IN_DAY = MS_IN_HOUR * 24;
var MS_IN_WEEK = MS_IN_DAY * 7;

// src/utils/functions/generateToken.ts
var import_config = require("dotenv/config");

// src/utils/functions/hashPassword.ts
var import_bcrypt2 = __toESM(require("bcrypt"), 1);

// src/utils/functions/sanitizeObject.ts
var import_sanitize_html = __toESM(require("sanitize-html"), 1);
var sanitizeObject = (object) => {
  for (const key of Object.keys(object)) {
    if (typeof object[key] === "string") {
      object[key] = (0, import_sanitize_html.default)(object[key]).trim();
    } else if (typeof object[key] === "object" && object[key] !== null) {
      object[key] = sanitizeObject(object[key]);
    }
  }
  return object;
};

// src/middlewares/schema.middleware.ts
var schemaMiddleware = (schema) => {
  return (req, res, next) => {
    res.locals.sanitizedRequest = sanitizeObject({
      ...req.params,
      ...req.body,
      ...req.query
    });
    const result = schema.safeParse(res.locals.sanitizedRequest);
    if (!result.success && "error" in result) {
      const errorMessages = result.error.issues.map((issue) => {
        return issue.path ? `${issue.path.join(".")}: ${issue.message}` : issue.message;
      });
      throw errors_default.unprocessableEntityError(errorMessages);
    }
    next();
  };
};
var schema_middleware_default = schemaMiddleware;
