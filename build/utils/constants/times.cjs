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

// src/utils/constants/times.ts
var times_exports = {};
__export(times_exports, {
  HOUR_IN_DAY: () => HOUR_IN_DAY,
  MIN_IN_HOUR: () => MIN_IN_HOUR,
  MS_IN_DAY: () => MS_IN_DAY,
  MS_IN_HOUR: () => MS_IN_HOUR,
  MS_IN_MINUTE: () => MS_IN_MINUTE,
  MS_IN_SECOND: () => MS_IN_SECOND,
  MS_IN_WEEK: () => MS_IN_WEEK,
  SEC_IN_MINUTE: () => SEC_IN_MINUTE
});
module.exports = __toCommonJS(times_exports);
var MS_IN_SECOND = 1e3;
var MS_IN_MINUTE = MS_IN_SECOND * 60;
var MS_IN_HOUR = MS_IN_MINUTE * 60;
var MS_IN_DAY = MS_IN_HOUR * 24;
var MS_IN_WEEK = MS_IN_DAY * 7;
var SEC_IN_MINUTE = 60;
var MIN_IN_HOUR = 60;
var HOUR_IN_DAY = 24;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HOUR_IN_DAY,
  MIN_IN_HOUR,
  MS_IN_DAY,
  MS_IN_HOUR,
  MS_IN_MINUTE,
  MS_IN_SECOND,
  MS_IN_WEEK,
  SEC_IN_MINUTE
});
