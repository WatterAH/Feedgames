import { Router } from "express";
import valorantController from "../controllers/valorant.controller";

const valorantRouter = Router();

valorantRouter.get("/val/auth/:userId", valorantController.auth);
valorantRouter.delete("/val/unlink/:userId", valorantController.unlink);
valorantRouter.get("/oauth2-callback", valorantController.callback);
valorantRouter.get("/val/list/:puuid", valorantController.list);

export default valorantRouter;
