import { Router } from "express";
import { loadSuggestions } from "../controllers/suggestions.controller.js";

export const suggestionsRouter = Router();

suggestionsRouter.get("/api/loadSuggestions", loadSuggestions);
