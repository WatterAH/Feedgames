import { Router } from "express";
import postController from "../controllers/postController";
import multer from "multer";
import postValidator from "../validator/postValidator";

const postRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

postRouter.get("/list/:type", postController.getPosts);
postRouter.get("/:id", postController.getPostById);
postRouter.get("/replies/:id", postController.getResponses);
postRouter.put("/:id", postValidator.put, postController.updatePost);
postRouter.post(
  "/",
  upload.single("image"),
  postValidator.post,
  postController.createPost,
);
postRouter.delete("/:id", postController.deletePost);

export default postRouter;
