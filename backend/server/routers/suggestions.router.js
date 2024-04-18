"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suggestionsRouter = void 0;
const express_1 = require("express");
const suggestions_controller_1 = require("../controllers/suggestions.controller");
exports.suggestionsRouter = (0, express_1.Router)();
exports.suggestionsRouter.get("/api/loadSuggestions", suggestions_controller_1.loadSuggestions);
