"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// node_modules/chalk/source/vendor/ansi-styles/index.js
var ANSI_BACKGROUND_OFFSET = 10;
var wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
var styles = {
  modifier: {
    reset: [0, 0],
    // 21 isn't widely supported and 22 does the same thing
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    // Bright color
    blackBright: [90, 39],
    gray: [90, 39],
    // Alias of `blackBright`
    grey: [90, 39],
    // Alias of `blackBright`
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39]
  },
  bgColor: {
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    // Bright color
    bgBlackBright: [100, 49],
    bgGray: [100, 49],
    // Alias of `bgBlackBright`
    bgGrey: [100, 49],
    // Alias of `bgBlackBright`
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
  }
};
var modifierNames = Object.keys(styles.modifier);
var foregroundColorNames = Object.keys(styles.color);
var backgroundColorNames = Object.keys(styles.bgColor);
var colorNames = [...foregroundColorNames, ...backgroundColorNames];
function assembleStyles() {
  const codes = /* @__PURE__ */ new Map();
  for (const [groupName, group] of Object.entries(styles)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles[styleName] = {
        open: `\x1B[${style[0]}m`,
        close: `\x1B[${style[1]}m`
      };
      group[styleName] = styles[styleName];
      codes.set(style[0], style[1]);
    }
    Object.defineProperty(styles, groupName, {
      value: group,
      enumerable: false
    });
  }
  Object.defineProperty(styles, "codes", {
    value: codes,
    enumerable: false
  });
  styles.color.close = "\x1B[39m";
  styles.bgColor.close = "\x1B[49m";
  styles.color.ansi = wrapAnsi16();
  styles.color.ansi256 = wrapAnsi256();
  styles.color.ansi16m = wrapAnsi16m();
  styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
  Object.defineProperties(styles, {
    rgbToAnsi256: {
      value(red, green, blue) {
        if (red === green && green === blue) {
          if (red < 8) {
            return 16;
          }
          if (red > 248) {
            return 231;
          }
          return Math.round((red - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
      },
      enumerable: false
    },
    hexToRgb: {
      value(hex) {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let [colorString] = matches;
        if (colorString.length === 3) {
          colorString = [...colorString].map((character) => character + character).join("");
        }
        const integer = Number.parseInt(colorString, 16);
        return [
          /* eslint-disable no-bitwise */
          integer >> 16 & 255,
          integer >> 8 & 255,
          integer & 255
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
      enumerable: false
    },
    ansi256ToAnsi: {
      value(code) {
        if (code < 8) {
          return 30 + code;
        }
        if (code < 16) {
          return 90 + (code - 8);
        }
        let red;
        let green;
        let blue;
        if (code >= 232) {
          red = ((code - 232) * 10 + 8) / 255;
          green = red;
          blue = red;
        } else {
          code -= 16;
          const remainder = code % 36;
          red = Math.floor(code / 36) / 5;
          green = Math.floor(remainder / 6) / 5;
          blue = remainder % 6 / 5;
        }
        const value = Math.max(red, green, blue) * 2;
        if (value === 0) {
          return 30;
        }
        let result = 30 + (Math.round(blue) << 2 | Math.round(green) << 1 | Math.round(red));
        if (value === 2) {
          result += 60;
        }
        return result;
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles;
}
var ansiStyles = assembleStyles();
var ansi_styles_default = ansiStyles;

// node_modules/chalk/source/vendor/supports-color/index.js
var import_node_process = __toESM(require("process"), 1);
var import_node_os = __toESM(require("os"), 1);
var import_node_tty = __toESM(require("tty"), 1);
function hasFlag(flag, argv = globalThis.Deno ? globalThis.Deno.args : import_node_process.default.argv) {
  const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
  const position = argv.indexOf(prefix + flag);
  const terminatorPosition = argv.indexOf("--");
  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
var { env } = import_node_process.default;
var flagForceColor;
if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
  flagForceColor = 0;
} else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
  flagForceColor = 1;
}
function envForceColor() {
  if ("FORCE_COLOR" in env) {
    if (env.FORCE_COLOR === "true") {
      return 1;
    }
    if (env.FORCE_COLOR === "false") {
      return 0;
    }
    return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
  }
}
function translateLevel(level) {
  if (level === 0) {
    return false;
  }
  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
  const noFlagForceColor = envForceColor();
  if (noFlagForceColor !== void 0) {
    flagForceColor = noFlagForceColor;
  }
  const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
  if (forceColor === 0) {
    return 0;
  }
  if (sniffFlags) {
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
  }
  if ("TF_BUILD" in env && "AGENT_NAME" in env) {
    return 1;
  }
  if (haveStream && !streamIsTTY && forceColor === void 0) {
    return 0;
  }
  const min = forceColor || 0;
  if (env.TERM === "dumb") {
    return min;
  }
  if (import_node_process.default.platform === "win32") {
    const osRelease = import_node_os.default.release().split(".");
    if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }
    return 1;
  }
  if ("CI" in env) {
    if ("GITHUB_ACTIONS" in env) {
      return 3;
    }
    if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
      return 1;
    }
    return min;
  }
  if ("TEAMCITY_VERSION" in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  }
  if (env.COLORTERM === "truecolor") {
    return 3;
  }
  if (env.TERM === "xterm-kitty") {
    return 3;
  }
  if ("TERM_PROGRAM" in env) {
    const version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (env.TERM_PROGRAM) {
      case "iTerm.app": {
        return version >= 3 ? 3 : 2;
      }
      case "Apple_Terminal": {
        return 2;
      }
    }
  }
  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }
  if ("COLORTERM" in env) {
    return 1;
  }
  return min;
}
function createSupportsColor(stream, options = {}) {
  const level = _supportsColor(stream, {
    streamIsTTY: stream && stream.isTTY,
    ...options
  });
  return translateLevel(level);
}
var supportsColor = {
  stdout: createSupportsColor({ isTTY: import_node_tty.default.isatty(1) }),
  stderr: createSupportsColor({ isTTY: import_node_tty.default.isatty(2) })
};
var supports_color_default = supportsColor;

// node_modules/chalk/source/utilities.js
function stringReplaceAll(string, substring, replacer) {
  let index = string.indexOf(substring);
  if (index === -1) {
    return string;
  }
  const substringLength = substring.length;
  let endIndex = 0;
  let returnValue = "";
  do {
    returnValue += string.slice(endIndex, index) + substring + replacer;
    endIndex = index + substringLength;
    index = string.indexOf(substring, endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}
function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
  let endIndex = 0;
  let returnValue = "";
  do {
    const gotCR = string[index - 1] === "\r";
    returnValue += string.slice(endIndex, gotCR ? index - 1 : index) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
    endIndex = index + 1;
    index = string.indexOf("\n", endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}

// node_modules/chalk/source/index.js
var { stdout: stdoutColor, stderr: stderrColor } = supports_color_default;
var GENERATOR = Symbol("GENERATOR");
var STYLER = Symbol("STYLER");
var IS_EMPTY = Symbol("IS_EMPTY");
var levelMapping = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
];
var styles2 = /* @__PURE__ */ Object.create(null);
var applyOptions = (object, options = {}) => {
  if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
    throw new Error("The `level` option should be an integer from 0 to 3");
  }
  const colorLevel = stdoutColor ? stdoutColor.level : 0;
  object.level = options.level === void 0 ? colorLevel : options.level;
};
var chalkFactory = (options) => {
  const chalk2 = (...strings) => strings.join(" ");
  applyOptions(chalk2, options);
  Object.setPrototypeOf(chalk2, createChalk.prototype);
  return chalk2;
};
function createChalk(options) {
  return chalkFactory(options);
}
Object.setPrototypeOf(createChalk.prototype, Function.prototype);
for (const [styleName, style] of Object.entries(ansi_styles_default)) {
  styles2[styleName] = {
    get() {
      const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
      Object.defineProperty(this, styleName, { value: builder });
      return builder;
    }
  };
}
styles2.visible = {
  get() {
    const builder = createBuilder(this, this[STYLER], true);
    Object.defineProperty(this, "visible", { value: builder });
    return builder;
  }
};
var getModelAnsi = (model, level, type, ...arguments_) => {
  if (model === "rgb") {
    if (level === "ansi16m") {
      return ansi_styles_default[type].ansi16m(...arguments_);
    }
    if (level === "ansi256") {
      return ansi_styles_default[type].ansi256(ansi_styles_default.rgbToAnsi256(...arguments_));
    }
    return ansi_styles_default[type].ansi(ansi_styles_default.rgbToAnsi(...arguments_));
  }
  if (model === "hex") {
    return getModelAnsi("rgb", level, type, ...ansi_styles_default.hexToRgb(...arguments_));
  }
  return ansi_styles_default[type][model](...arguments_);
};
var usedModels = ["rgb", "hex", "ansi256"];
for (const model of usedModels) {
  styles2[model] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "color", ...arguments_), ansi_styles_default.color.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
  const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
  styles2[bgModel] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "bgColor", ...arguments_), ansi_styles_default.bgColor.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
}
var proto = Object.defineProperties(() => {
}, {
  ...styles2,
  level: {
    enumerable: true,
    get() {
      return this[GENERATOR].level;
    },
    set(level) {
      this[GENERATOR].level = level;
    }
  }
});
var createStyler = (open, close, parent) => {
  let openAll;
  let closeAll;
  if (parent === void 0) {
    openAll = open;
    closeAll = close;
  } else {
    openAll = parent.openAll + open;
    closeAll = close + parent.closeAll;
  }
  return {
    open,
    close,
    openAll,
    closeAll,
    parent
  };
};
var createBuilder = (self, _styler, _isEmpty) => {
  const builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
  Object.setPrototypeOf(builder, proto);
  builder[GENERATOR] = self;
  builder[STYLER] = _styler;
  builder[IS_EMPTY] = _isEmpty;
  return builder;
};
var applyStyle = (self, string) => {
  if (self.level <= 0 || !string) {
    return self[IS_EMPTY] ? "" : string;
  }
  let styler = self[STYLER];
  if (styler === void 0) {
    return string;
  }
  const { openAll, closeAll } = styler;
  if (string.includes("\x1B")) {
    while (styler !== void 0) {
      string = stringReplaceAll(string, styler.close, styler.open);
      styler = styler.parent;
    }
  }
  const lfIndex = string.indexOf("\n");
  if (lfIndex !== -1) {
    string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
  }
  return openAll + string + closeAll;
};
Object.defineProperties(createChalk.prototype, styles2);
var chalk = createChalk();
var chalkStderr = createChalk({ level: stderrColor ? stderrColor.level : 0 });
var source_default = chalk;

// src/app.ts
var import_express_async_errors = require("express-async-errors");
var import_cors = __toESM(require("cors"), 1);
var import_helmet = __toESM(require("helmet"), 1);
var import_express8 = __toESM(require("express"), 1);

// src/configs/loadEnvs.ts
var import_dotenv = __toESM(require("dotenv"), 1);
var import_dotenv_expand = __toESM(require("dotenv-expand"), 1);
function loadEnv() {
  const path = `envs/.env.${process.env.NODE_ENV}`;
  const currentEnvs = import_dotenv.default.config({ path });
  import_dotenv_expand.default.expand(currentEnvs);
}

// src/middlewares/error.middleware.ts
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

// src/routes/index.ts
var import_express7 = require("express");

// src/routes/auth-router.ts
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

// src/routes/category-router.ts
var import_express2 = require("express");

// src/controllers/category-controller.ts
var import_http_status3 = __toESM(require("http-status"), 1);

// src/errors/not-found-error.ts
function notFoundError() {
  return {
    name: "NotFoundError",
    message: "No result for this search!"
  };
}

// src/repositories/category-repository/index.ts
var import_diacritics = __toESM(require("diacritics"), 1);

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

// src/controllers/category-controller.ts
async function createCategory2(req, res) {
  const { nome } = req.body;
  try {
    const result = await category_service_default.createCategory({ nome });
    return res.status(import_http_status3.default.OK).send(result);
  } catch (error) {
    if (error.name === "AlreadyExists") {
      return res.status(import_http_status3.default.CONFLICT).send({ message: "Category already exists" });
    } else {
      return res.status(import_http_status3.default.BAD_REQUEST).send({});
    }
  }
}
async function getAllCategories3(req, res) {
  try {
    const categories = await category_service_default.getAllCategories();
    return res.status(import_http_status3.default.OK).send(categories);
  } catch (error) {
    return res.status(import_http_status3.default.INTERNAL_SERVER_ERROR).send({});
  }
}

// src/routes/category-router.ts
var categoryRouter = (0, import_express2.Router)();
categoryRouter.post("/", createCategory2);
categoryRouter.get("/", getAllCategories3);

// src/routes/fitFor-router.ts
var import_express3 = require("express");

// src/controllers/fitFor-controller.ts
var import_http_status4 = __toESM(require("http-status"), 1);

// src/repositories/fitFor-repository/index.ts
var import_diacritics2 = __toESM(require("diacritics"), 1);
async function createFitFor(nome) {
  const normalizedName = import_diacritics2.default.remove(nome.toLowerCase());
  const existingFit = await database_connection_default.aplicacoes.findUnique({
    where: {
      nome: normalizedName
    }
  });
  if (existingFit) {
    throw AlreadyExists();
  }
  const fitFor = await database_connection_default.aplicacoes.create({
    data: {
      nome: normalizedName
    }
  });
  return fitFor;
}
async function getAllFitFor() {
  const allFitFor = await database_connection_default.aplicacoes.findMany();
  return allFitFor;
}
var fitForRepository = {
  createFitFor,
  getAllFitFor
};
var fitFor_repository_default = fitForRepository;

// src/services/fitFor-service/index.ts
async function createFitFor2(nome) {
  const fitFor = await fitFor_repository_default.createFitFor(nome);
  if (!fitFor)
    throw notFoundError();
  return fitFor;
}
var fitForService = {
  createFitFor: createFitFor2
};
var fitFor_service_default = fitForService;

// src/controllers/fitFor-controller.ts
async function createFitFor3(req, res) {
  const { nome } = req.body;
  try {
    const result = await fitFor_service_default.createFitFor(nome);
    return res.status(import_http_status4.default.OK).send(result);
  } catch (error) {
    if (error.name === "AlreadyExists") {
      return res.status(import_http_status4.default.CONFLICT).send({ message: "Already exists" });
    } else {
      return res.status(import_http_status4.default.BAD_REQUEST).send({});
    }
  }
}

// src/routes/fitFor-router.ts
var fitForRouter = (0, import_express3.Router)();
fitForRouter.post("/", createFitFor3);

// src/routes/product-router.ts
var import_express4 = require("express");

// src/controllers/product-controller.ts
var import_http_status5 = __toESM(require("http-status"), 1);

// src/repositories/product-repository/index.ts
async function createProduct(nome, codigoProduto, marcaProduto, codigoFabricante, categoriaProdutoId, versaoCarroId) {
  const produto = await database_connection_default.produto.create({
    data: {
      nome,
      codigo_produto: codigoProduto,
      marca_produto: marcaProduto,
      codigo_fabricante: codigoFabricante,
      categoria_produto: { connect: { id: categoriaProdutoId } },
      versao_produtos: {
        create: {
          versao_carro: { connect: { id: versaoCarroId } }
        }
      }
    }
  });
  return produto;
}
async function getAllProducts() {
  const products = await database_connection_default.produto.findMany({
    include: {
      categoria_produto: true,
      versao_produtos: {
        include: {
          versao_carro: true
        }
      }
    }
  });
  return products;
}
async function updateProduct(productId, updatedData) {
  const existingProduct = await database_connection_default.produto.findUnique({
    where: { id: productId },
    include: {
      versao_produtos: true,
      categoria_produto: true
    }
  });
  const updatedProduct = await database_connection_default.produto.update({
    where: { id: productId },
    data: {
      nome: updatedData.nome,
      codigo_produto: updatedData.codigo_produto,
      marca_produto: updatedData.marca_produto,
      codigo_fabricante: updatedData.codigo_fabricante,
      categoria_produto_id: updatedData.categoria_produto_id,
      observacoes: updatedData.observacoes,
      imagem: updatedData.imagem,
      link: updatedData.link
    },
    include: {
      versao_produtos: {
        include: {
          versao_carro: true
        }
      },
      categoria_produto: true
    }
  });
  return updatedProduct;
}
async function deleteProduct(productId) {
  await database_connection_default.versao_produtos.deleteMany({
    where: {
      produto_id: productId
    }
  });
  const deletedProduct3 = await database_connection_default.produto.delete({
    where: { id: productId }
  });
  return deletedProduct3;
}
var productRepository = {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct
};
var product_repository_default = productRepository;

// src/services/product-service/index.ts
async function createProduct2(nome, codigoProduto, marcaProduto, codigoFabricante, categoriaProdutoId, versaoCarroId) {
  const product = await product_repository_default.createProduct(nome, codigoProduto, marcaProduto, codigoFabricante, categoriaProdutoId, versaoCarroId);
  if (!product)
    throw notFoundError();
  return product;
}
async function getAllProducts2() {
  const products = await product_repository_default.getAllProducts();
  return products;
}
async function updateProduct2(productId, updatedData) {
  const update = await product_repository_default.updateProduct(productId, updatedData);
  if (!update) {
    throw new Error("Produto n\xE3o encontrado");
  }
  return update;
}
async function deletedProduct(productId) {
  const deletedProduct3 = await product_repository_default.deleteProduct(productId);
  if (!deletedProduct3) {
    throw new Error("Produto n\xE3o encontrado");
  }
  return deletedProduct3;
}
var productService = {
  createProduct: createProduct2,
  getAllProducts: getAllProducts2,
  updateProduct: updateProduct2,
  deletedProduct
};
var product_service_default = productService;

// src/controllers/product-controller.ts
async function createProduct3(req, res) {
  const {
    nome,
    codigoProduto,
    marcaProduto,
    codigoFabricante,
    categoriaProdutoId,
    versaoCarroId
  } = req.body;
  try {
    const product = await product_service_default.createProduct(
      nome,
      codigoProduto,
      marcaProduto,
      codigoFabricante,
      categoriaProdutoId,
      versaoCarroId
    );
    return res.status(import_http_status5.default.OK).send(product);
  } catch (error) {
    if (error.name === "AlreadyExists") {
      return res.status(import_http_status5.default.CONFLICT).send({ message: "Product already exists" });
    } else {
      return res.status(import_http_status5.default.BAD_REQUEST).send({});
    }
  }
}
async function getAllProducts3(req, res) {
  try {
    const products = await product_service_default.getAllProducts();
    return res.status(import_http_status5.default.OK).send(products);
  } catch (error) {
    return res.status(import_http_status5.default.BAD_REQUEST).send({});
  }
}
async function updateProduct3(req, res) {
  const { productId, updatedData } = req.body;
  try {
    const update = await product_service_default.updateProduct(productId, updatedData);
    return res.status(import_http_status5.default.OK).send(update);
  } catch (error) {
    return res.status(import_http_status5.default.BAD_REQUEST).send({});
  }
}
async function deletedProduct2(req, res) {
  const { productId } = req.body;
  try {
    const deleted = await product_service_default.deletedProduct(productId);
    return res.status(import_http_status5.default.OK).send(deleted);
  } catch (error) {
    return res.status(import_http_status5.default.BAD_REQUEST).send({});
  }
}

// src/routes/product-router.ts
var productRouter = (0, import_express4.Router)();
productRouter.post("/", createProduct3);
productRouter.get("/", getAllProducts3);
productRouter.put("/", updateProduct3);
productRouter.delete("/", deletedProduct2);

// src/routes/user-router.ts
var import_express5 = require("express");

// src/controllers/user-controller.ts
var import_http_status6 = __toESM(require("http-status"), 1);

// src/services/users-service/index.ts
var import_bcrypt2 = __toESM(require("bcrypt"), 1);
async function createUser2({ nome, email, password }) {
  const hashedPassword = await import_bcrypt2.default.hash(password, 12);
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
    return res.status(import_http_status6.default.CREATED).json({
      id: user.id,
      nome: user.nome,
      email: user.email
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(import_http_status6.default.CONFLICT).send(error);
    }
    return res.status(import_http_status6.default.BAD_REQUEST).send(error);
  }
}

// src/schemas/user-schemas.ts
var import_joi2 = __toESM(require("joi"), 1);
var createUserSchema = import_joi2.default.object({
  nome: import_joi2.default.string().min(3).required(),
  email: import_joi2.default.string().email().required(),
  password: import_joi2.default.string().min(6).required()
});

// src/routes/user-router.ts
var userRouter = (0, import_express5.Router)();
userRouter.post("/", validateBody(createUserSchema), userPost);

// src/routes/vehicle-router.ts
var import_express6 = require("express");

// src/controllers/vehicle-controller.ts
var import_http_status7 = __toESM(require("http-status"), 1);

// src/repositories/vehicle-repository/index.ts
var import_diacritics3 = __toESM(require("diacritics"), 1);
async function registerBrand(imagem, nome) {
  const normalizedCategoryName = import_diacritics3.default.remove(nome.toLowerCase());
  const existingCategory = await database_connection_default.marca_carro.findUnique({
    where: {
      nome: normalizedCategoryName
    }
  });
  if (existingCategory) {
    throw AlreadyExists();
  }
  const category = await database_connection_default.marca_carro.create({
    data: {
      imagem,
      nome: normalizedCategoryName
    }
  });
  return category;
}
async function getAllBrands() {
  const brands = await database_connection_default.marca_carro.findMany();
  return brands;
}
async function registerModel(nome, marcaId, imagem) {
  const normalizedModelName = import_diacritics3.default.remove(nome.toLowerCase());
  const existingModel = await database_connection_default.modelo_carro.findUnique({
    where: {
      nome: normalizedModelName
    }
  });
  if (existingModel) {
    return "AlreadyExists";
  }
  const model = await database_connection_default.modelo_carro.create({
    data: {
      imagem,
      nome: normalizedModelName,
      marca_carro: {
        connect: {
          id: marcaId
        }
      }
    }
  });
  return model;
}
async function getAllModels() {
  const models = await database_connection_default.modelo_carro.findMany();
  return models;
}
async function getModelsByVehicleId(vehicleId) {
  const models = await database_connection_default.modelo_carro.findMany({
    where: { marca_id: vehicleId }
  });
  return models;
}
async function registerVersion(nome, modeloId, ano, observacoes, imagem) {
  const normalizedVersionName = import_diacritics3.default.remove(nome.toLowerCase());
  const existingVersion = await database_connection_default.versao_carro.findUnique({
    where: {
      nome: normalizedVersionName
    }
  });
  if (existingVersion) {
    return "AlreadyExists";
  }
  const version = await database_connection_default.versao_carro.create({
    data: {
      imagem,
      nome: normalizedVersionName,
      ano,
      observacoes,
      modelo_carro: {
        connect: {
          id: modeloId
        }
      }
    }
  });
  return version;
}
async function getVersionByModelId(marcaId) {
  const models = await database_connection_default.versao_carro.findMany({
    where: { modelo_id: marcaId }
  });
  return models;
}
async function getAllVersions() {
  const versions = await database_connection_default.versao_carro.findMany();
  return versions;
}
var vehicleRepository = {
  registerBrand,
  getAllBrands,
  registerModel,
  getAllModels,
  getModelsByVehicleId,
  registerVersion,
  getAllVersions,
  getVersionByModelId
};
var vehicle_repository_default = vehicleRepository;

// src/services/vehicle-service/index.ts
async function createBrand(params) {
  const brand = await vehicle_repository_default.registerBrand(params.imagem, params.nome);
  if (!brand)
    throw notFoundError();
  return brand;
}
async function getAllBrands2() {
  const brands = await vehicle_repository_default.getAllBrands();
  return brands;
}
async function registerModel2(params) {
  try {
    const model = await vehicle_repository_default.registerModel(params.nome, params.marcaId, params.imagem);
    if (!model)
      throw notFoundError();
    return model;
  } catch (error) {
    console.log(error);
  }
}
async function getAllModels2() {
  const models = await vehicle_repository_default.getAllModels();
  return models;
}
async function getModelByVehicleId(vehicleId) {
  const models = await vehicle_repository_default.getModelsByVehicleId(vehicleId);
  return models;
}
async function getAllVersions2() {
  const versions = await vehicle_repository_default.getAllVersions();
  return versions;
}
async function getVersionByModelId2(marcaId) {
  const models = await vehicle_repository_default.getVersionByModelId(marcaId);
  return models;
}
async function registerVersion2(params) {
  try {
    const version = await vehicle_repository_default.registerVersion(
      params.nome,
      params.modeloId,
      params.ano,
      params.observacoes,
      params.imagem
    );
    if (!version)
      throw notFoundError();
    return version;
  } catch (error) {
    console.log(error);
  }
}
var vehicleService = {
  createBrand,
  getAllBrands: getAllBrands2,
  registerModel: registerModel2,
  getAllModels: getAllModels2,
  getModelByVehicleId,
  registerVersion: registerVersion2,
  getAllVersions: getAllVersions2,
  getVersionByModelId: getVersionByModelId2
};
var vehicle_service_default = vehicleService;

// src/controllers/vehicle-controller.ts
async function createBrand2(req, res) {
  const { imagem, nome } = req.body;
  try {
    const result = await vehicle_service_default.createBrand({ imagem, nome });
    return res.status(import_http_status7.default.OK).send(result);
  } catch (error) {
    if (error.name === "AlreadyExists") {
      return res.status(import_http_status7.default.CONFLICT).send({ message: "Brand already exists" });
    } else {
      return res.status(import_http_status7.default.BAD_REQUEST).send({});
    }
  }
}
async function getAllBrands3(req, res) {
  try {
    const categories = await vehicle_service_default.getAllBrands();
    return res.status(import_http_status7.default.OK).send(categories);
  } catch (error) {
    return res.status(import_http_status7.default.INTERNAL_SERVER_ERROR).send({});
  }
}
async function registerModel3(req, res) {
  const { nome, marcaId, imagem } = req.body;
  try {
    const result = await vehicle_service_default.registerModel({ nome, marcaId, imagem });
    if (result === "AlreadyExists") {
      return res.status(import_http_status7.default.CONFLICT).send({ message: "Model already exists" });
    }
    return res.status(import_http_status7.default.OK).send(result);
  } catch (error) {
    return res.status(import_http_status7.default.BAD_REQUEST).send({});
  }
}
async function getAllModels3(req, res) {
  try {
    const models = await vehicle_service_default.getAllModels();
    return res.status(import_http_status7.default.OK).send(models);
  } catch (error) {
    return res.status(import_http_status7.default.INTERNAL_SERVER_ERROR).send({});
  }
}
async function getModelsByVehicleId2(req, res) {
  const vehicleId = req.params.id;
  const numberVehicleId = Number(vehicleId);
  try {
    const models = await vehicle_service_default.getModelByVehicleId(numberVehicleId);
    return res.status(import_http_status7.default.OK).send(models);
  } catch (error) {
    return res.status(import_http_status7.default.INTERNAL_SERVER_ERROR).send({});
  }
}
async function registerVersion3(req, res) {
  const { nome, modeloId, ano, imagem, observacoes } = req.body;
  try {
    const result = await vehicle_service_default.registerVersion({ nome, modeloId, imagem, ano, observacoes });
    if (result === "AlreadyExists") {
      return res.status(import_http_status7.default.CONFLICT).send({ message: "Version already exists" });
    }
    return res.status(import_http_status7.default.OK).send(result);
  } catch (error) {
    return res.status(import_http_status7.default.BAD_REQUEST).send({});
  }
}
async function getAllVersions3(req, res) {
  try {
    const versions = await vehicle_service_default.getAllVersions();
    return res.status(import_http_status7.default.OK).send(versions);
  } catch (error) {
    return res.status(import_http_status7.default.INTERNAL_SERVER_ERROR).send({});
  }
}
async function getVersionByModelId3(req, res) {
  const marcaId = req.params.id;
  console.log(marcaId);
  const numberModelId = Number(marcaId);
  try {
    const version = await vehicle_service_default.getModelByVehicleId(numberModelId);
    console.log(version);
    return res.status(import_http_status7.default.OK).send(version);
  } catch (error) {
    return res.status(import_http_status7.default.INTERNAL_SERVER_ERROR).send({});
  }
}

// src/routes/vehicle-router.ts
var vehicleRouter = (0, import_express6.Router)();
vehicleRouter.post("/", createBrand2);
vehicleRouter.get("/", getAllBrands3);
vehicleRouter.post("/model", registerModel3);
vehicleRouter.get("/model", getAllModels3);
vehicleRouter.get("/model/:id", getModelsByVehicleId2);
vehicleRouter.post("/model/version", registerVersion3);
vehicleRouter.get("/model/version", getAllVersions3);
vehicleRouter.get("/model/version/:id", getVersionByModelId3);

// src/routes/index.ts
var routes = (0, import_express7.Router)();
routes.use("/user", userRouter);
routes.use("/sign-in", authRouter);
routes.use("/category", categoryRouter);
routes.use("/vehicle", vehicleRouter);
routes.use("/product", productRouter);
routes.use("/fitfor", fitForRouter);
var routes_default = routes;

// src/app.ts
loadEnv();
var app = (0, import_express8.default)();
app.use((0, import_cors.default)());
app.use((0, import_express8.json)());
app.use((0, import_helmet.default)());
app.get("/health", (_req, res) => res.send("OK!"));
app.use(routes_default);
app.use(error_middleware_default);
var app_default = app;

// src/server.ts
var port = process.env.PORT || 5e3;
app_default.listen(port, () => {
  console.log(source_default.green(`Server running in port: ${port}`));
});
