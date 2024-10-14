import { supabase } from "../database/connection";
import { getNotifyById, notify, readAllByIds } from "../database/notifications";
import { insertFollow, stopFollow } from "../database/insert";
import { RequestHandler } from "express";
import { deleteLike, deleteSave } from "../database/delete";

export const getNotifications: RequestHandler = async (req, res) => {
  try {
    const { id, page, limit } = req.query;
    const userId = id as string;
    const pageInt = parseInt(page as string, 10);
    const limitInt = parseInt(limit as string, 10);

    const { notify, error } = await getNotifyById(userId, pageInt, limitInt);
    if (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: "No se pudieron obtener las notificaciones" });
    }
    if (notify) {
      const ids = notify.map((notification) => notification.id);
      readAllByIds(ids);
    }
    return res.status(200).json(notify);
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const likePost: RequestHandler = async (req, res) => {
  try {
    const { id_user, id_post, username, user_post } = req.body;
    const data = { id_user, id_post };
    const { error: deleteError } = await deleteLike(id_user, id_post);
    const { error: insertError } = await supabase.from("liked").insert([data]);
    if (deleteError || insertError) return res.status(400).end();
    if (id_user != user_post) {
      const text = `Le gustó tu publicación`;
      await notify(user_post, false, "p", id_post, text, username);
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
    const { error: deleteError } = await deleteSave(id_user, id_post);
    const { error: insertError } = await supabase.from("saved").insert([data]);

    if (deleteError || insertError) return res.status(400).end();

    return res.status(200).end();
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const dontLikePost: RequestHandler = async (req, res) => {
  try {
    const { id_user, id_post } = req.body;
    const { error } = await deleteLike(id_user, id_post);
    if (error) return res.status(400).end();

    return res.status(200).end();
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const dontSavePost: RequestHandler = async (req, res) => {
  try {
    const { id_user, id_post } = req.body;
    const { error } = await deleteSave(id_user, id_post);
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

    const text = `Comenzó a seguirte`;
    notify(id_followed, false, "u", id_follower, text, username);
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
