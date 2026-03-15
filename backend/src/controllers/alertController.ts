import { Request, Response } from "express";
import shortUUID from "short-uuid";
import alertService from "../service/alertService";
import { sendError, sendSuccess } from "../libs/responseHandler";
import { processAlert } from "../libs/server";

const translator = shortUUID();

class AlertController {
  async getAlerts(req: Request, res: Response) {
    try {
      const id = req.query.id as string;
      const rawpage = req.query.page as string;
      const rawlimit = req.query.limit as string;

      const userId = translator.toUUID(id);
      const page = parseInt(rawpage, 10);
      const limit = parseInt(rawlimit, 10);

      const alerts = await alertService.list(userId, limit, page);
      if (alerts.error) return sendError(res, alerts.error.message, 400);
      if (!alerts.data) return sendError(res, "Not found", 404);

      const result = alerts.data.map((alert) => processAlert(alert));
      return sendSuccess(res, result);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async hasUnreadAlerts(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const userId = translator.toUUID(id as string);

      const alerts = await alertService.getAlerts(userId, 10, 0);

      if (!alerts) {
        return sendError(res, "Error al obtener las notificaciones", 400);
      }

      const hasUnread = alerts.some((alert) => alert.read === false);
      return sendSuccess(res, hasUnread);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async deleteAlert(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (await alertService.delete(id)) {
        return sendSuccess(res, "Eliminada");
      }
      return sendError(res, "No se pudo eliminar la notificación", 400);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }
}

export default new AlertController();
