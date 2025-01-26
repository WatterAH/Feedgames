import { Router } from "express";
import {
  getMatchByUuid,
  getMatchesList,
  getPlayerUuid,
  oauth2_callback,
  setRiotId,
} from "../controllers/valorant.controller";

const valorantRouter = Router();

valorantRouter.get("/oauth2-callback", oauth2_callback);
valorantRouter.get("/val/getPlayerUuid", getPlayerUuid);
valorantRouter.get("/val/getMatchesList", getMatchesList);
valorantRouter.get("/val/getMatchByUuid", getMatchByUuid);
valorantRouter.put("/val/setRiotId", setRiotId);

export default valorantRouter;
