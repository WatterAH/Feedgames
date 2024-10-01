import { Router } from "express";
import {
  deleteComment,
  deleteNote,
  deleteNotify,
  deletePost,
} from "../controllers/delete.controller";

export const deleteRouter = Router();

deleteRouter.delete("/api/deletePost", deletePost);
deleteRouter.delete("/api/deleteComment", deleteComment);
deleteRouter.delete("/api/deleteNotification", deleteNotify);
deleteRouter.delete("/api/deleteNote", deleteNote);
