import { Router } from "express";
import socialController from "../controllers/socialController";

const interactionRouter = Router();

interactionRouter.post("/interact/:type", socialController.interact);
interactionRouter.delete("/unInteract/:type/", socialController.uninteract);
interactionRouter.post("/follow", socialController.follow);
interactionRouter.delete("/unFollow", socialController.unfollow);

export default interactionRouter;
