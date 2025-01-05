import multer from "multer";
import { Router } from "express";
import {
  createPost,
  deletePost,
  editPost,
  getPost,
} from "../controllers/postCrud.controller";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const postcrudRouter = Router();

postcrudRouter.post("/api/createPost", upload.single("image"), createPost);
postcrudRouter.put("/api/editPost", editPost);
postcrudRouter.delete("/api/deletePost", deletePost);
postcrudRouter.get("/api/getPost", getPost);
