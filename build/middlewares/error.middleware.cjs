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

// src/middlewares/error.middleware.ts
var error_middleware_exports = {};
__export(error_middleware_exports, {
  default: () => error_middleware_default
});
module.exports = __toCommonJS(error_middleware_exports);
var handleApplicationErrors = (err, req, res, _next) => {
  if (err.status) {
    return res.status(err.status).send({ name: err.name, message: err.message });
  }
  console.log(err);
  return res.status(500).send({
    message: "Internal Server Error"
  });
};
var error_middleware_default = handleApplicationErrors;
