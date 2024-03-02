import { supabase } from "../database/connection.js";
import {
  getNotificationsById,
  notify,
  readAllByIds,
} from "../database/notifications.js";
import { insertFollow, stopFollow } from "../database/insert.js";

export const getNotifications = async (req, res) => {
  try {
    const { id } = req.query;
    const { notifications, error } = await getNotificationsById(id);
    if (error) {
      return res
        .status(400)
        .json({ message: "No se pudieron obtener las notificaciones" });
    } else {
      res.status(200).json(notifications);
      const ids = notifications.map((notification) => notification.id);
      await readAllByIds(ids);
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id_user, id_post, username, user_post } = req.body;
    const { error } = await supabase.from("liked").insert([
      {
        id_user,
        id_post,
      },
    ]);

    if (error) {
      return res.status(400).json({ message: "Error" });
    } else {
      if (id_user != user_post) {
        const text = `A ${username} le gusta tu publicación`;
        notify(user_post, false, "p", id_post, text, 0);
        return res.status(200).json({ message: "Te gusta" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const savePost = async (req, res) => {
  try {
    const { id_user, id_post } = req.body;
    const { error } = await supabase.from("saved").insert([
      {
        id_user,
        id_post,
      },
    ]);

    if (error) {
      return res.status(400).json({ message: "Error al guardar" });
    } else {
      return res.status(200).json({ message: "Guardado" });
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const dontLikePost = async (req, res) => {
  try {
    const { id_user, id_post } = req.body;
    const { error } = await supabase
      .from("liked")
      .delete()
      .eq("id_user", id_user)
      .eq("id_post", id_post);
    if (error) {
      return res.status(400).json({ message: "Error al eliminar" });
    } else {
      return res.status(200).json({ message: "Ya no te gusta" });
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const dontSavePost = async (req, res) => {
  try {
    const { id_user, id_post } = req.body;
    const { error } = await supabase
      .from("saved")
      .delete()
      .eq("id_user", id_user)
      .eq("id_post", id_post);
    if (error) {
      return res.status(400).json({ message: "Error al eliminar" });
    } else {
      return res.status(200).json({ message: "Eliminado de guardados" });
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const followUser = async (req, res) => {
  try {
    const { id_follower, id_followed, username } = req.body;
    const { error } = await insertFollow(id_follower, id_followed);
    if (error) {
      return res
        .status(400)
        .json({ message: "No se pudo completar la accion" });
    } else {
      const text = `${username} comenzo a seguirte`;
      notify(id_followed, false, "u", id_follower, text, 2);
      return res.status(200).json({ message: "OK" });
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const stopFollowUser = async (req, res) => {
  try {
    const { id_follower, id_followed } = req.body;
    const { error } = await stopFollow(id_follower, id_followed);
    if (error) {
      return res
        .status(400)
        .json({ message: "No se pudo completar la accion" });
    } else {
      return res.status(200).json({ message: "Ya no sigues a este usuario" });
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
