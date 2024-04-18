"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedRouter = void 0;
const express_1 = require("express");
const feed_controller_1 = require("../controllers/feed.controller");
exports.feedRouter = (0, express_1.Router)();
exports.feedRouter.get("/api/loadPosts", feed_controller_1.loadPosts);
