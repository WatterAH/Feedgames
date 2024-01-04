import { Router } from "express";
import {
  getPost,
  getProfile,
  getProfilePosts,
  searchTerm,
} from "../controllers/actions.controller.js";

export const actionsRouter = Router();

actionsRouter.get("/api/getProfile", getProfile);
actionsRouter.get("/api/getProfilePosts", getProfilePosts);
actionsRouter.get("/api/getPost", getPost);
actionsRouter.get("/api/searchTerm", searchTerm);
