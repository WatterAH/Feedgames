import { Router } from "express";
import userController from "../controllers/userController";
import multer from "multer";
import userValidator from "../validator/userValidator";

const userRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

userRouter.get("/users/:id", userController.getProfileById);
userRouter.post("/users", userValidator.post, userController.createProfile);
userRouter.put(
  "/users/:id",
  upload.single("image"),
  userValidator.put,
  userController.updateProfile
);
userRouter.post("/auth", userController.auth);
userRouter.post("/checkToken/:token", userController.checkToken);

export default userRouter;
