import userService from "../service/userService";
import bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import { sendError, sendSuccess } from "../libs/responseHandler";
import { createAccessToken, validateToken } from "../libs/token";

class ServiceController {
  async getToken(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const query = await userService.find(email, "email");
      if (query.error) return sendError(res, query.error.message, 400);
      if (!query.data) return sendError(res, "Not found", 404);

      const token = await createAccessToken({ userId: query.data.id }, "15m");
      await userService.sendMail(token, email);

      return sendSuccess(res, true);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { password, token } = req.body;

      const data = await validateToken(token);
      if (!data) return sendError(res, "El token no es valido", 401);

      const hash = await bcryptjs.hash(password, 10);

      const user = await userService.update(data.userId, {
        password: hash,
      });
      if (user.error) return sendError(res, user.error.message, 400);
      if (!user.data) return sendError(res, "No se pudo completar", 500);

      return sendSuccess(res, user.data);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }
}

export default new ServiceController();
