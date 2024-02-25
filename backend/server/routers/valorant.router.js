import { Router } from "express";
import {
  getPlayerUuid,
  oauth2_callback,
} from "../controllers/valorant.controller.js";

export const valorantRouter = Router();

valorantRouter.get("/oauth2-callback", oauth2_callback);
valorantRouter.get("/val/getPlayerUuid", getPlayerUuid);
