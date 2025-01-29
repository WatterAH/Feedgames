import { Router } from "express";
import serviceController from "../controllers/serviceController";

const serviceRouter = Router();

serviceRouter.post("/getToken/", serviceController.getToken);
serviceRouter.post("/resetPassword", serviceController.resetPassword);

export default serviceRouter;
