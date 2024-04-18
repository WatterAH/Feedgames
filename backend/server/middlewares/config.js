"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
exports.config = app;
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://feedgames.vercel.app",
        "http://192.168.1.70:19006",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use("*", (0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
