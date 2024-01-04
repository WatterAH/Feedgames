import { Router } from "express";
import { loadPosts } from "../controllers/feed.controller.js";

export const feedRouter = Router();

feedRouter.get("/api/loadPosts", loadPosts);
