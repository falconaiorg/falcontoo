"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dummy_1 = require("@falcon/dummy");
dotenv_1.default.config();
const app = (0, express_1.default)();
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
});
app.all("/", (req, res, next) => {
    console.log("Received a request");
    next();
});
app.get("/", (req, res) => {
    const dummy = (0, dummy_1.dummyFunction)();
    res.send(`Hello from Draco! ${dummy}`);
});
//# sourceMappingURL=index.js.map