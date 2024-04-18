import { Router } from "express";
import {
  dontLikePost,
  dontSavePost,
  followUser,
  getNotifications,
  likePost,
  savePost,
  stopFollowUser,
} from "../controllers/interactions.controller";

export const interactionsRouter = Router();

interactionsRouter.post("/api/savePost", savePost);
interactionsRouter.post("/api/likePost", likePost);
interactionsRouter.delete("/api/dontLikePost", dontLikePost);
interactionsRouter.delete("/api/dontSavePost", dontSavePost);
interactionsRouter.post("/api/followUser", followUser);
interactionsRouter.delete("/api/stopFollowUser", stopFollowUser);
interactionsRouter.get("/api/getNotifications", getNotifications);
