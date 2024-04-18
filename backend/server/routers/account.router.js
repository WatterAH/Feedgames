"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRouter = void 0;
const multer_1 = __importDefault(require("multer"));
const express_1 = require("express");
const account_controller_1 = require("../controllers/account.controller");
const validator_1 = require("../middlewares/validator");
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
exports.accountRouter = (0, express_1.Router)();
exports.accountRouter.post("/api/usernameAvailable", validator_1.validateUsername, account_controller_1.usernameAvailable);
exports.accountRouter.post("/api/login", account_controller_1.login);
exports.accountRouter.get("/api/logout", account_controller_1.logout);
exports.accountRouter.post("/api/register", upload.single("image"), account_controller_1.register);
exports.accountRouter.get("/api/checkAuth", account_controller_1.checkAuth);
exports.accountRouter.put("/api/editProfileById", upload.single("image"), validator_1.validateBody, account_controller_1.editProfileById);
