import multer from "multer";
import { Router } from "express";
import {
  checkSessionToken,
  login,
  register,
} from "../controllers/account.controller";
import { usernameAvailable, validateRegister } from "../middlewares/account";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const accountRouter = Router();

accountRouter.post("/api/login", login);
accountRouter.post(
  "/api/register",
  upload.single("image"),
  usernameAvailable,
  validateRegister,
  register
);
accountRouter.get("/api/checkAuth", checkSessionToken);
