import multer from "multer";
import { Router } from "express";
import {
  createNewPost,
  loadLiked,
  loadSaved,
} from "../controllers/post.controller";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const postRouter = Router();

postRouter.post("/api/createNewPost", upload.single("image"), createNewPost);
postRouter.get("/api/loadSaved", loadSaved);
postRouter.get("/api/loadLiked", loadLiked);
