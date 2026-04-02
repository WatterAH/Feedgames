import { Router } from "express";
import inboxController from "../controllers/inboxController";

const messageRouter = Router();

messageRouter.get("/:id", inboxController.messages);
messageRouter.post("/", inboxController.send);

export default messageRouter;
