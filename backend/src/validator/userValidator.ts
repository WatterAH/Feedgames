import { NextFunction, Request, Response } from "express";
import userService from "../service/userService";
import { sendError } from "../libs/responseHandler";

class UserValidator {
  async post(req: Request, res: Response, next: NextFunction) {
    const { username, name } = req.body;

    if (!username || !name) {
      return sendError(res, "El nombre y el usuario son necesarios!", 400);
    }

    const maybeuser = await userService.getProfilByUsername(username);

    if (maybeuser) {
      return sendError(res, "Este nombre de usuario ya existe :(", 400);
    }

    next();
  }

  async put(req: Request, res: Response, next: NextFunction) {
    let { data } = req.body;
    data = JSON.parse(data);
    const image = req.file;

    const types = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
      "image/heic",
      "image/heif",
      "image/gif",
    ];

    if (!data || !data.username || !data.name) {
      return sendError(res, "El nombre y el usuario son necesarios!", 400);
    }

    if (image) {
      const maxSize = 5 * 1024 * 1024; // 5 MB;

      if (!types.includes(image.mimetype)) {
        return sendError(res, "Formato de imagen no válido!", 400);
      }

      if (image.size > maxSize) {
        return sendError(res, "Tu imagen demasiado grande!", 400);
      }
    }

    next();
  }
}

export default new UserValidator();
