import multer from "multer";
import { Router } from "express";
import {
  deleteResponse,
  dontLikeComment,
  getResponse,
  likeComment,
  response,
} from "../controllers/response.controller";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const responseRouter = Router();

responseRouter.post("/api/likeComment", likeComment);
responseRouter.post("/api/dontLikeComment", dontLikeComment);
responseRouter.post("/api/response", upload.single("image"), response);
responseRouter.delete("/api/deleteResponse", deleteResponse);
responseRouter.get("/api/getResponse", getResponse);
