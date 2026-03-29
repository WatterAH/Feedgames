import { Router } from "express";
import inboxController from "../controllers/inboxController";

const inboxRouter = Router();

inboxRouter.get("/list/:id", inboxController.list);
inboxRouter.post("/create", inboxController.create);
inboxRouter.get("/:id", inboxController.find);

export default inboxRouter;
