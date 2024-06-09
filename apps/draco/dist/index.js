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

// src/index.ts
var import_express = __toESM(require("express"));
var import_dotenv = __toESM(require("dotenv"));
var import_cors = __toESM(require("cors"));
var import_server = require("@falcon/trpc/node/server.js");
var trpcExpress = __toESM(require("@trpc/server/adapters/express"));
var base64Secret = process.env.NEXTAUTH_SECRET;
import_dotenv.default.config();
var app = (0, import_express.default)();
var HOST = process.env.HOST || "localhost";
var PORT = 8e3;
app.use((0, import_cors.default)());
app.all("/", async (req, res, next) => {
  console.log("Hello from Draco!");
  next();
});
app.all("/trpc", async (req, res, next) => {
  console.log(req.headers);
  console.log(req.body);
  console.log("Hello from Draco!");
  next();
});
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: import_server.appRouter,
    createContext: import_server.createContext
  })
);
app.listen(PORT, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
app.get("/", (req, res) => {
  res.send(`Hello from Draco!`);
});
