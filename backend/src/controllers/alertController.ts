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

  async getAlertById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      const alert = await alertService.find(id);
      if (alert.error) return sendError(res, alert.error.message, 400);
      if (!alert.data) return sendError(res, "Not found", 404);

      const result = processAlert(alert.data);
      return sendSuccess(res, result);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async hasUnreadAlerts(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      const userId = translator.toUUID(id);

      const unread = await alertService.hasAlerts(userId);

      return sendSuccess(res, unread);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async readAlerts(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      const userId = translator.toUUID(id);

      await alertService.read(userId);

      return sendSuccess(res, true);
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
