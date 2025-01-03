import shortUUID from "short-uuid";
import { RequestHandler } from "express";
import { getNotifyById, readAllByIds } from "../database/notifications";
import { deleteNotification } from "../database/delete";
import { processNotify } from "../libs/server";

const translator = shortUUID();

export const getNotifications: RequestHandler = async (req, res) => {
  try {
    const { id, page, limit } = req.query;
    const userId = translator.toUUID(id as string);
    const pageInt = parseInt(page as string, 10);
    const limitInt = parseInt(limit as string, 10);

    const { notify, error } = await getNotifyById(userId, pageInt, limitInt);

    if (error || !notify) {
      res
        .status(400)
        .json({ message: "No se pudieron obtener las notificaciones" });
      return;
    }

    const ids = notify.map((notification) => notification.id);
    readAllByIds(ids);

    const processedNotify = notify.map((noty) => processNotify(noty));

    res.status(200).json(processedNotify);
  } catch (error) {
    res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const deleteNotify: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;
    const { error } = await deleteNotification(id);

    if (error) {
      res.status(400).json("No se pudo eliminar la notificación");
      return;
    }

    res.status(200).end();
  } catch {
    res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
