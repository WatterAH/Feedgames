import userService from "../service/userService";
import bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import { sendError, sendSuccess } from "../libs/responseHandler";
import { createAccessToken, validateToken } from "../libs/token";

class ServiceController {
  async getToken(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await userService.getProfileByEmail(email);

      if (!user) {
        return sendSuccess(res, true);
      }

      const token = await createAccessToken({ userId: user.id }, "15m");
      await userService.sendMail(token, email);

      return sendSuccess(res, true);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { password, token } = req.body;

      const data: any = await validateToken(token);

      if (!data) {
        return sendError(res, "El token no es valido", 401);
      }

      const hash = await bcryptjs.hash(password, 10);

      const result = await userService.updateProfile(data.userId, {
        password: hash,
      });

      if (!result) {
        return sendError(res, "Error al actualizar la contraseña", 500);
      }

      return sendSuccess(res, result);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }
}

export default new ServiceController();
