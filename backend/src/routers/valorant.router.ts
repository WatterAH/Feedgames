import { Router } from "express";
import valorantController, {
  getMatchByUuid,
  getMatchesList,
  getPlayerUuid,
  setRiotId,
} from "../controllers/valorant.controller";

const valorantRouter = Router();

valorantRouter.get("/val/auth/:userId", valorantController.auth);
valorantRouter.get("/oauth2-callback", valorantController.callback);
valorantRouter.get("/val/getPlayerUuid", getPlayerUuid);
valorantRouter.get("/val/getMatchesList", getMatchesList);
valorantRouter.get("/val/getMatchByUuid", getMatchByUuid);
valorantRouter.put("/val/setRiotId", setRiotId);

export default valorantRouter;
