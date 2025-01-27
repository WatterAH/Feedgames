import { Router } from "express";
import alertController from "../controllers/alertController";

const alertRouter = Router();

alertRouter.get("/alerts", alertController.getAlerts);
alertRouter.get("/hasUnreadAlerts/:id", alertController.hasUnreadAlerts);
alertRouter.delete("/alerts/:id", alertController.deleteAlert);

export default alertRouter;
