import { Router } from "express";
import alertController from "../controllers/alertController";

const alertRouter = Router();

alertRouter.get("/list", alertController.getAlerts);
alertRouter.get("/:id", alertController.getAlertById);
alertRouter.put("/:id", alertController.readAlerts);
alertRouter.delete("/:id", alertController.deleteAlert);
alertRouter.get("/hasUnreadAlerts/:id", alertController.hasUnreadAlerts);

export default alertRouter;
