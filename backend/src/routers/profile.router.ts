import multer from "multer";
import { Router } from "express";
import { editProfile, getProfile } from "../controllers/profile.controller";
import { validateBody } from "../middlewares/validator";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const profileRouter = Router();

profileRouter.get("/api/getProfile", getProfile);
profileRouter.put(
  "/api/editProfile",
  upload.single("image"),
  validateBody,
  editProfile
);
