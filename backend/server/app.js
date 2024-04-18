"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = require("./middlewares/config");
const mainRouter_1 = require("./middlewares/mainRouter");
const app = (0, express_1.default)();
exports.app = app;
app.use(config_1.config);
app.use(mainRouter_1.mainRouter);
