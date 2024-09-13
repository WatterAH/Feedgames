import { Router } from "express";
import {
  loadPosts,
  createNewNote,
  getAllNotes,
} from "../controllers/feed.controller";

export const feedRouter = Router();

feedRouter.get("/api/loadPosts", loadPosts);
feedRouter.post("/api/createNewNote", createNewNote);
feedRouter.get("/api/getAllNotes", getAllNotes);
