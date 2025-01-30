import { NextFunction, Request, Response } from "express";
import { sendError } from "../libs/responseHandler";
import { ContentTypes } from "../interfaces/Post";

class PostValidator {
  async post(req: Request, res: Response, next: NextFunction) {
    const { text, content } = req.body;
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

    const contentTypes: ContentTypes[] = [
      "image",
      "pixelart",
      "textonly",
      "valorant",
    ];

    if (!contentTypes.includes(content.type)) {
      return sendError(res, "Tipo de contenido no valido!", 400);
    }

    if (!text.trim() || !content) {
      return sendError(res, "Tu post está vacío!", 400);
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

  async put(req: Request, res: Response, next: NextFunction) {
    const { text, content } = req.body;

    if (content.type == "textonly" && !text.trim()) {
      return sendError(res, "El post no puede estar vacío", 400);
    }

    next();
  }
}

export default new PostValidator();
