import { Router } from "express";
import { createNewPost, loadSaved } from "../controllers/post.controller.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const postRouter = Router();

postRouter.post("/api/createNewPost", upload.single("image"), createNewPost);
postRouter.get("/api/loadSaved", loadSaved);
