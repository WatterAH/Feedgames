import { Router } from "express";
import { loadPosts } from "../controllers/feed.controller";

export const feedRouter = Router();

feedRouter.get("/api/loadPosts", loadPosts);
