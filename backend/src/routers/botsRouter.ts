import { Router } from "express";
import botsController from "../controllers/botsController";

const botsRouter = Router();

botsRouter.get("/test", botsController.test);
botsRouter.post("/post", botsController.post);

export default botsRouter;
