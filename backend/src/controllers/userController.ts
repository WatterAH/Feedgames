import files from "../libs/files";
import shortUUID from "short-uuid";
import bcryptjs from "bcryptjs";
import userService from "../service/userService";
import { User } from "../interfaces/User";
import { processUser } from "../libs/server";
import { Request, Response } from "express";
import { sendError, sendSuccess } from "../libs/responseHandler";
import { createAccessToken, validateToken } from "../libs/token";

const translator = shortUUID();

class UserController {
  async getProfileById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { requestId } = req.query;

      if (!id || !requestId) {
        return sendError(res, "Faltan parametros obligatorios", 400);
      }

      const parsedUserId = translator.toUUID(id as string);
      const parsedRequestId = translator.toUUID(requestId as string);

      const user = await userService.getProfileById(parsedUserId);

      if (!user) {
        return sendError(res, "Error al obtener perfil", 500);
      }

      const result = processUser(user, parsedRequestId);
      return sendSuccess(res, result);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async createProfile(req: Request, res: Response) {
    try {
      const data: User = req.body;
      data.password = await bcryptjs.hash(data.password, 10);

      const user = await userService.createProfile(data);

      if (!user) {
        return sendError(res, "Error al crear perfil", 500);
      }

      const result = processUser(user, "");

      const token = await createAccessToken(result);
      return sendSuccess(res, { user: result, token });
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const { id } = req.params;
      let { data } = req.body;
      data = JSON.parse(data);
      const image = req.file;
      if (!data.bio.trim()) data.bio = "Sin descripción";

      const parsedId = translator.toUUID(id);
      const pfpname = await files.updateProfilePicture(image, parsedId);

      if (pfpname) data.pfp = pfpname;

      const user = await userService.updateProfile(parsedId, data);

      if (!user) {
        return sendError(
          res,
          "Este nombre de usuario ya existe, prueba otro!",
          500
        );
      }

      const result = processUser(user, parsedId);
      return sendSuccess(res, result);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async auth(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const user = await userService.getProfilByUsername(username);

      if (!user) {
        return sendError(res, "Verifica tus credenciales", 401);
      }

      const isValidPassword = await bcryptjs.compare(password, user.password);

      if (!isValidPassword) {
        return sendError(res, "Verifica tus credenciales", 401);
      }

      const result = processUser(user, "");
      const token = await createAccessToken(result);
      return sendSuccess(res, { user: result, token });
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async checkToken(req: Request, res: Response) {
    try {
      const { token } = req.params;
      const user = await validateToken(token);
      if (!user) {
        return sendError(res, "Unauthorized", 401);
      }

      return sendSuccess(res, { user, token });
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }
}

export default new UserController();
