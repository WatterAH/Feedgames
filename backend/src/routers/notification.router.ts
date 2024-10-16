import { Router } from "express";
import {
  deleteNotify,
  getNotifications,
} from "../controllers/notification.controller";

export const notifyRouter = Router();

notifyRouter.get("/api/getNotifications", getNotifications);
notifyRouter.delete("/api/deleteNotification", deleteNotify);
