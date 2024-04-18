"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const multer_1 = __importDefault(require("multer"));
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
exports.postRouter = (0, express_1.Router)();
exports.postRouter.post("/api/createNewPost", upload.single("image"), post_controller_1.createNewPost);
exports.postRouter.get("/api/loadSaved", post_controller_1.loadSaved);
