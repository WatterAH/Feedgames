import { Router } from "express";
import {
  getMatchByUuid,
  getMatchesIdsByPuuid,
  getPlayerByName,
} from "../controllers/valorant.controller.js";

export const valorantRouter = Router();

valorantRouter.get("/api/getPlayerByName", getPlayerByName);
valorantRouter.get("/api/getMatchesIdsByPuuid", getMatchesIdsByPuuid);
valorantRouter.get("/api/getMatchByUuid", getMatchByUuid);
