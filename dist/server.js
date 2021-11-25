"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
require("./database/connection");
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("cors"));
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use(routes_1.router);
server.listen(process.env.PORT || 3000, () => console.log("Server is Running!"));
