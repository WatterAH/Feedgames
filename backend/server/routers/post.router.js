import { Router } from "express";
import { createNewPost, loadSaved } from "../controllers/post.controller.js";

export const postRouter = Router();

postRouter.post("/api/createNewPost", createNewPost);
postRouter.get("/api/loadSaved", loadSaved);
