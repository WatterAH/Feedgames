import { Router } from "express";
import {
  getFollowedById,
  getFollowersById,
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
actionsRouter.get("/api/getFollowedById", getFollowedById);
actionsRouter.get("/api/getFollowersById", getFollowersById);
