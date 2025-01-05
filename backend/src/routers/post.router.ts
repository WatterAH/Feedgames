import { Router } from "express";
import {
  getCurrentTerm,
  getPostsByUser,
  loadLiked,
  loadSaved,
  loadTopLikedPosts,
} from "../controllers/post.controller";

export const postRouter = Router();

postRouter.get("/api/loadSaved", loadSaved);
postRouter.get("/api/loadLiked", loadLiked);
postRouter.get("/api/getPostsByUser", getPostsByUser);
postRouter.get("/api/getCurrentTerm", getCurrentTerm);
postRouter.get("/api/loadTopLikedPosts", loadTopLikedPosts);
