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
      const id = req.params.id as string;
      const requestId = req.query.requestId as string;

      const parsedUserId = translator.toUUID(id as string);
      const parsedRequestId = translator.toUUID(requestId as string);

      const query = await userService.find(parsedUserId, "id");
      if (query.error) return sendError(res, query.error.message, 400);
      if (!query.data) return sendError(res, "Not found", 404);

      const result = processUser(query.data, parsedRequestId);
      return sendSuccess(res, result);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async createProfile(req: Request, res: Response) {
    try {
      const data: User = req.body;
      data.password = await bcryptjs.hash(data.password, 10);

      const user = await userService.create(data);
      if (user.error) return sendError(res, user.error.message, 500);
      if (!user.data) return sendError(res, "Error al crear perfil", 500);

      const result = processUser(user.data, "");

      const token = await createAccessToken({ id: result.id });
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

      const user = await userService.update(parsedId, data);
      if (user.error) return sendError(res, user.error.message, 500);
      if (!user.data) return sendError(res, "Error al actualizar perfil", 500);

      const result = processUser(user.data, parsedId);
      return sendSuccess(res, result);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async auth(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const query = await userService.find(username, "username");
      if (query.error) return sendError(res, query.error.message, 400);
      if (!query.data) return sendError(res, "Not found", 404);

      const { data } = query;

      const validPassword = await bcryptjs.compare(password, data.password);

      if (!validPassword) {
        return sendError(res, "Verifica tus credenciales", 401);
      }

      const result = processUser(data, "");
      const token = await createAccessToken({ id: result.id });
      return sendSuccess(res, { user: result, token });
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async checkToken(req: Request, res: Response) {
    try {
      const token = req.params.token;
      const data = await validateToken(token);
      if (!data) return sendError(res, "Unauthorized", 401);

      const userId = translator.toUUID(data.id);

      const user = await userService.find(userId, "id");
      if (user.error) return sendError(res, user.error.message, 400);
      if (!user.data) return sendError(res, "Not found", 404);

      const result = processUser(user.data, "");

      return sendSuccess(res, { user: result, token });
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }
}

export default new UserController();
