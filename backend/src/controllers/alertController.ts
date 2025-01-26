import { Request, Response } from "express";
import shortUUID from "short-uuid";
import alertService from "../service/alertService";
import { sendError, sendSuccess } from "../libs/responseHandler";
import { processAlert } from "../libs/server";

const translator = shortUUID();

class AlertController {
  async getAlerts(req: Request, res: Response) {
    try {
      const { id, page, limit } = req.query;

      const userId = translator.toUUID(id as string);
      const pageInt = parseInt(page as string, 10);
      const limitInt = parseInt(limit as string, 10);

      const alerts = await alertService.getAlerts(userId, limitInt, pageInt);

      if (!alerts) {
        return sendError(res, "No se pudieron obtener las notificaciones", 400);
      }

      alertService.readAlerts(userId);

      const result = alerts.map((alert) => processAlert(alert));
      return sendSuccess(res, result);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async deleteAlert(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (await alertService.deleteAlert(id)) {
        return sendSuccess(res, "Eliminada");
      }
      return sendError(res, "No se pudo eliminar la notificación", 400);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }
}

export default new AlertController();
