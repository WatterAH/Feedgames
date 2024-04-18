import { Router } from "express";
import { loadSuggestions } from "../controllers/suggestions.controller";

export const suggestionsRouter = Router();

suggestionsRouter.get("/api/loadSuggestions", loadSuggestions);
