import { supabase } from "../database/connection";
import {
  getNotificationsById,
  notify,
  readAllByIds,
} from "../database/notifications";
import { insertFollow, stopFollow } from "../database/insert";
import { RequestHandler } from "express";

export const getNotifications: RequestHandler = async (req, res) => {
  try {
    const { id } = req.query;
    const { notifications, error } = await getNotificationsById(id as string);
    if (error) {
      return res
        .status(400)
        .json({ message: "No se pudieron obtener las notificaciones" });
    }
    if (notifications) {
      const ids = notifications.map((notification) => notification.id);
      readAllByIds(ids);
    }
    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const likePost: RequestHandler = async (req, res) => {
  try {
    const { id_user, id_post, username, user_post } = req.body;
    const data = { id_user, id_post };
    const { error } = await supabase.from("liked").insert([data]);
    if (error) return res.status(400).end();

    if (id_user != user_post) {
      const text = `A ${username} le gusta tu publicación`;
      await notify(user_post, false, "p", id_post, text, 0);
    }
    return res.status(200).end();
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const savePost: RequestHandler = async (req, res) => {
  try {
    const { id_user, id_post } = req.body;
    const data = { id_user, id_post };
    const { error } = await supabase.from("saved").insert([data]);
    if (error) return res.status(400).end();

    return res.status(200).end();
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const dontLikePost: RequestHandler = async (req, res) => {
  try {
    const { id_user, id_post } = req.body;
    const { error } = await supabase
      .from("liked")
      .delete()
      .eq("id_user", id_user)
      .eq("id_post", id_post);
    if (error) return res.status(400).end();

    return res.status(200).end();
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const dontSavePost: RequestHandler = async (req, res) => {
  try {
    const { id_user, id_post } = req.body;
    const { error } = await supabase
      .from("saved")
      .delete()
      .eq("id_user", id_user)
      .eq("id_post", id_post);
    if (error) return res.status(400).end();

    return res.status(200).end();
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const followUser: RequestHandler = async (req, res) => {
  try {
    const { id_follower, id_followed, username } = req.body;
    const { error } = await insertFollow(id_follower, id_followed);
    if (error) return res.status(400).end();

    const text = `${username} comenzo a seguirte`;
    notify(id_followed, false, "u", id_follower, text, 2);
    return res.status(200).end();
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const stopFollowUser: RequestHandler = async (req, res) => {
  try {
    const { id_follower, id_followed } = req.body;
    const { error } = await stopFollow(id_follower, id_followed);
    if (error) return res.status(400).end();

    return res.status(200).end();
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
