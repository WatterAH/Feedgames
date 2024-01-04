import { Router } from "express";
import {
  checkAuth,
  editProfileById,
  login,
  logout,
  register,
} from "../controllers/account.controller.js";

export const accountRouter = Router();

accountRouter.post("/api/login", login);
accountRouter.get("/api/logout", logout);
accountRouter.post("/api/register", register);
accountRouter.get("/api/checkAuth", checkAuth);
accountRouter.put("/api/editProfileById", editProfileById);
