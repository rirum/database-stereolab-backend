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

// src/utils/functions/index.ts
var functions_exports = {};
__export(functions_exports, {
  comparePasswords: () => comparePasswords,
  generateToken: () => generateToken,
  hashPassword: () => hashPassword,
  sanitizeObject: () => sanitizeObject
});
module.exports = __toCommonJS(functions_exports);

// src/utils/functions/comparePasswords.ts
var import_bcrypt = __toESM(require("bcrypt"), 1);
var comparePasswords = async (plainPassword, hashedPassword) => {
  const isMatch = await import_bcrypt.default.compare(plainPassword, hashedPassword);
  return isMatch;
};

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
var generateToken = async (payload) => {
  const token = import_jsonwebtoken.default.sign(payload, process.env.JWT_SECRET, {
    expiresIn: MS_IN_DAY
  });
  return token;
};

// src/utils/functions/hashPassword.ts
var import_bcrypt2 = __toESM(require("bcrypt"), 1);
var hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await import_bcrypt2.default.hash(password, saltRounds);
  return hashedPassword;
};

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  comparePasswords,
  generateToken,
  hashPassword,
  sanitizeObject
});
