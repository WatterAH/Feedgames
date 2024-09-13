import { Router } from "express";
import {
  loadPopularUsers,
  loadSuggestions,
} from "../controllers/suggestions.controller";

export const suggestionsRouter = Router();

suggestionsRouter.get("/api/loadSuggestions", loadSuggestions);
suggestionsRouter.get("/api/loadPopularUsers", loadPopularUsers);
