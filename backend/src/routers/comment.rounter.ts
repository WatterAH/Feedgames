import { Router } from "express";
import {
  comment,
  dontLikeComment,
  getComment,
  getCommentsByPostId,
  getResponsesByCommentId,
  likeComment,
  response,
} from "../controllers/comment.controller";

export const commentRounter = Router();

commentRounter.post("/api/comment", comment);
commentRounter.post("/api/likeComment", likeComment);
commentRounter.post("/api/dontLikeComment", dontLikeComment);
commentRounter.post("/api/response", response);
commentRounter.get("/api/getComment", getComment);
commentRounter.get("/api/getCommentsByPostId", getCommentsByPostId);
commentRounter.get("/api/getResponsesByCommentId", getResponsesByCommentId);
