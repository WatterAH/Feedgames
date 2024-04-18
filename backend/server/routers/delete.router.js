"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRouter = void 0;
const express_1 = require("express");
const delete_controller_1 = require("../controllers/delete.controller");
exports.deleteRouter = (0, express_1.Router)();
exports.deleteRouter.delete("/api/deletePost", delete_controller_1.deletePost);
exports.deleteRouter.delete("/api/deleteComment", delete_controller_1.deleteComment);
exports.deleteRouter.delete("/api/deleteNotification", delete_controller_1.deleteNotify);
