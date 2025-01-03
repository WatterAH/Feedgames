import multer from "multer";
import { Router } from "express";
import {
  createPost,
  deletePost,
  editPost,
  getCurrentTerm,
  getPost,
  getPostsByUser,
  loadLiked,
  loadSaved,
  loadTopLikedPosts,
} from "../controllers/post.controller";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const postRouter = Router();

postRouter.post("/api/createPost", upload.single("image"), createPost);
postRouter.put("/api/editPost", editPost);
postRouter.delete("/api/deletePost", deletePost);
postRouter.get("/api/loadSaved", loadSaved);
postRouter.get("/api/loadLiked", loadLiked);
postRouter.get("/api/getPost", getPost);
postRouter.get("/api/getPostsByUser", getPostsByUser);
postRouter.get("/api/getCurrentTerm", getCurrentTerm);
postRouter.get("/api/loadTopLikedPosts", loadTopLikedPosts);
