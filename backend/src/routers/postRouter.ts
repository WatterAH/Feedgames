import { Router } from "express";
import postController from "../controllers/postController";
import multer from "multer";
import postValidator from "../validator/postValidator";

const postRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

postRouter.get("/posts/:type", postController.getPosts);
postRouter.get("/post/:id", postController.getPostById);
postRouter.put("/posts/:id", postValidator.put, postController.updatePost);
postRouter.post(
  "/posts",
  upload.single("image"),
  postValidator.post,
  postController.createPost
);
postRouter.delete("/posts/:id", postController.deletePost);

export default postRouter;
