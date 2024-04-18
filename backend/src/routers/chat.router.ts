import { Router } from "express";
import { getFriendsById } from "../controllers/chat.controller";

export const chatRouter = Router();

chatRouter.get("/api/getFriendsById", getFriendsById);
