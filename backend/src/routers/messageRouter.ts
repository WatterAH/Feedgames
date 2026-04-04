import { Router } from "express";
import inboxController from "../controllers/inboxController";

const messageRouter = Router();

messageRouter.get("/:id", inboxController.messages);
messageRouter.post("/", inboxController.send);
messageRouter.get("/hasUnread/:id", inboxController.hasUnread);
messageRouter.post("/markAsRead", inboxController.markAsRead);

export default messageRouter;
