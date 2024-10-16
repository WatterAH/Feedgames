import { Router } from "express";
import { getNotifications } from "../controllers/notification.controller";
import { deleteNotification } from "../database/delete";

export const notifyRouter = Router();

notifyRouter.get("/api/getNotifications", getNotifications);
notifyRouter.get("/api/deleteNotification", deleteNotification);
