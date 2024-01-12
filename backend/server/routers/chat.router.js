import { Router } from "express";
import { getFriendsById } from "../controllers/chat.controller.js";

export const chatRouter = Router();

chatRouter.get("/api/getFriendsById", getFriendsById);
