"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authmiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authmiddleware = async (request, response, next) => {
    const authorization = request.headers.authorization;
    if (!authorization) {
        return response.status(400).json({
            error: "Token is required!"
        });
    }
    const token = authorization.replace("Bearer", "").trim();
    try {
        await jsonwebtoken_1.default.verify(token, process.env.SECRET);
        next();
    }
    catch (erro) {
        return response.status(400).json({
            error: "Token invalid!"
        });
    }
};
exports.authmiddleware = authmiddleware;
