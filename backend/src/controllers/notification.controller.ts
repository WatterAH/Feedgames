import shortUUID from "short-uuid";
import { RequestHandler } from "express";
import { getNotifyById, readAllByIds } from "../database/notifications";
import { deleteNotification } from "../database/delete";

const translator = shortUUID();

export const getNotifications: RequestHandler = async (req, res) => {
  try {
    const { id, page, limit } = req.query;
    const userId = translator.toUUID(id as string);
    const pageInt = parseInt(page as string, 10);
    const limitInt = parseInt(limit as string, 10);

    const { notify, error } = await getNotifyById(userId, pageInt, limitInt);

    if (error || !notify) {
      return res
        .status(400)
        .json({ message: "No se pudieron obtener las notificaciones" });
    }

    const ids = notify.map((notification) => notification.id);

    readAllByIds(ids);

    return res.status(200).json(notify);
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const deleteNotify: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;
    const { error } = await deleteNotification(id);

    if (error) {
      return res.status(400).json("No se pudo eliminar la notificación");
    }

    return res.status(200).end();
  } catch {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
