import multer from "multer";
import { Router } from "express";
import {
  checkAuth,
  usernameAvailable,
  editProfileById,
  login,
  logout,
  register,
} from "../controllers/account.controller";
import { validateBody, validateUsername } from "../middlewares/validator";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const accountRouter = Router();

accountRouter.post(
  "/api/usernameAvailable",
  validateUsername,
  usernameAvailable
);
accountRouter.post("/api/login", login);
accountRouter.get("/api/logout", logout);
accountRouter.post(
  "/api/register",
  upload.single("image"),
  usernameAvailable,
  validateBody,
  register
);
accountRouter.get("/api/checkAuth", checkAuth);
accountRouter.put(
  "/api/editProfileById",
  upload.single("image"),
  validateBody,
  editProfileById
);
