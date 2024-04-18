"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.validateToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var JWT_KEY = process.env.JWT_KEY;
const createAccessToken = (payload) => {
    return new Promise(function (resolve, reject) {
        jsonwebtoken_1.default.sign(payload, JWT_KEY, { expiresIn: "30d" }, (err, token) => {
            if (err)
                reject(err);
            resolve(token);
        });
    });
};
exports.createAccessToken = createAccessToken;
const validateToken = (token) => {
    return new Promise((resolve) => {
        if (!token) {
            return resolve(null);
        }
        jsonwebtoken_1.default.verify(token, JWT_KEY, (err, decoded) => {
            if (err) {
                return resolve(null);
            }
            var user = decoded;
            return resolve(user);
        });
    });
};
exports.validateToken = validateToken;
const decodeToken = (token) => {
    const base64Payload = token.split(".")[1];
    const decodedPayload = Buffer.from(base64Payload, "base64").toString("utf-8");
    return JSON.parse(decodedPayload);
};
exports.decodeToken = decodeToken;
