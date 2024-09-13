import { Router } from "express";
import {
  getFollowedById,
  getFollowersById,
  getPost,
  getProfile,
  getProfilePosts,
  searchPost,
  searchUser,
} from "../controllers/actions.controller";

export const actionsRouter = Router();

actionsRouter.get("/api/getProfile", getProfile);
actionsRouter.get("/api/getProfilePosts", getProfilePosts);
actionsRouter.get("/api/getPost", getPost);
actionsRouter.get("/api/searchUser", searchUser);
actionsRouter.get("/api/searchPost", searchPost);
actionsRouter.get("/api/getFollowedById", getFollowedById);
actionsRouter.get("/api/getFollowersById", getFollowersById);
