import { Router } from "express";
import {
  getRandomUsers,
  loadSuggestions,
} from "../controllers/suggestions.controller.js";

export const suggestionsRouter = Router();

suggestionsRouter.get("/api/getRandomUsers", getRandomUsers);
suggestionsRouter.get("/api/loadSuggestions", loadSuggestions);
