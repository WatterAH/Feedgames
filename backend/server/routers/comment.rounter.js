import { Router } from "express";
import {
  comment,
  getComment,
  getCommentsByPostId,
  getResponsesByCommentId,
  response,
} from "../controllers/comment.controller.js";

export const commentRounter = Router();

commentRounter.post("/api/comment", comment);
commentRounter.post("/api/response", response);
commentRounter.get("/api/getComment", getComment);
commentRounter.get("/api/getCommentsByPostId", getCommentsByPostId);
commentRounter.get("/api/getResponsesByCommentId", getResponsesByCommentId);
