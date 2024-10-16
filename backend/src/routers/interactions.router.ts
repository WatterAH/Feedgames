import { Router } from "express";
import {
  unLikePost,
  unSavePost,
  followUser,
  likePost,
  savePost,
  unFollowUser,
} from "../controllers/interactions.controller";

export const interactionsRouter = Router();

interactionsRouter.post("/api/savePost", savePost);
interactionsRouter.post("/api/likePost", likePost);
interactionsRouter.delete("/api/unLikePost", unLikePost);
interactionsRouter.delete("/api/unSavePost", unSavePost);
interactionsRouter.post("/api/followUser", followUser);
interactionsRouter.delete("/api/unFollowUser", unFollowUser);
