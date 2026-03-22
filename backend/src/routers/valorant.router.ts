import { Router } from "express";
import {
  auth,
  getMatchByUuid,
  getMatchesList,
  getPlayerUuid,
  oauth2_callback,
  setRiotId,
} from "../controllers/valorant.controller";

const valorantRouter = Router();

valorantRouter.get("/val/auth/:userId", auth);
valorantRouter.get("/oauth2-callback", oauth2_callback);
valorantRouter.get("/val/getPlayerUuid", getPlayerUuid);
valorantRouter.get("/val/getMatchesList", getMatchesList);
valorantRouter.get("/val/getMatchByUuid", getMatchByUuid);
valorantRouter.put("/val/setRiotId", setRiotId);

export default valorantRouter;
