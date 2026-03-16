import { Router } from "express";
import serviceController from "../controllers/serviceController";

const serviceRouter = Router();

serviceRouter.post("/token", serviceController.getToken);
serviceRouter.post("/resetPassword", serviceController.resetPassword);

export default serviceRouter;
