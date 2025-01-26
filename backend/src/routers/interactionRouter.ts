import { Router } from "express";
import interactionController from "../controllers/interactionController";

const interactionRouter = Router();

interactionRouter.post("/interact/:type", interactionController.interact);
interactionRouter.delete(
  "/unInteract/:type/",
  interactionController.uninteract
);
interactionRouter.post("/follow", interactionController.follow);
interactionRouter.delete("/unFollow", interactionController.unfollow);

export default interactionRouter;
