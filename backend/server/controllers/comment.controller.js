import { supabase } from "../database/connection.js";
import { notify } from "../database/notifications.js";
import {
  getAllComents,
  getCommentById,
  getCommentsByIds,
  getResponses,
} from "../database/simpleGet.js";
import { getDate } from "../libs/dates.js";

export const getComment = async (req, res) => {
  try {
    const { commentId } = req.query;
    let { comment, error } = await getCommentById(commentId);
    if (error) {
      return res.status(404).json({ message: "Not Found" });
    } else {
      return res.status(200).json(comment);
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const comment = async (req, res) => {
  try {
    const { id_user, name } = req.body;
    const { id_post, comment, response, toNotify } = req.body;
    if (!comment.trim()) {
      return res.status(400).json({ message: "Tu comentario esta vacio!" });
    }
    const created_at = getDate();

    const insertData = { id_post, id_user, comment, created_at, response };
    let { data: commented, error } = await supabase
      .from("comments")
      .insert([insertData])
      .select(
        "*, responses!responses_id_responsed_fkey(id), user:users(username, name,pfp)"
      )
      .single();

    if (error) {
      return res.status(400).json({ message: "Error al subir comentario" });
    } else {
      if (toNotify != id_user) {
        const text = `${name} comento tu publicación`;
        notify(toNotify, false, "Post", id_post, text, 1);
      }
      return res.status(200).json(commented);
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const response = async (req, res) => {
  try {
    const { id_user, name } = req.body;
    const { id_post, comment, response, toNotify } = req.body;
    const { comment_res } = req.body;
    const created_at = getDate();
    const insertData = { id_post, id_user, comment, created_at, response };
    let { data: commented, error } = await supabase
      .from("comments")
      .insert([insertData])
      .select("*, user:users(username, name, pfp)")
      .single();

    if (error) {
      return res.status(400).json({ message: "Error al subir comentario" });
    } else {
      const { error } = await supabase
        .from("responses")
        .insert([{ id_comment: commented.id, id_responsed: comment_res }]);
      if (error) {
        return res.status(400).json({ message: "Error al subir comentario" });
      } else {
        if (id_user != toNotify) {
          const text = `${name} respondió tu comentario`;
          notify(toNotify, false, "Comment", comment_res, text, 1);
        }
        commented.responses = [];
        return res.status(200).json(commented);
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.query;
    let { comments, error } = await getAllComents(postId);
    if (error) {
      return res
        .status(400)
        .json({ message: "Error al cargar los comentarios" });
    } else {
      return res.status(200).json(comments);
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const getResponsesByCommentId = async (req, res) => {
  try {
    const { commentId } = req.query;
    let { comments: commentsIds, error } = await getResponses(commentId);
    if (error) {
      return res
        .status(400)
        .json({ message: "No se pudieron obtener las respuestas" });
    } else {
      commentsIds = commentsIds.map((comment) => comment.id_comment);
      let { comments, error } = await getCommentsByIds(commentsIds);
      if (error) {
        return res
          .status(400)
          .json({ message: "No se pudieron obtener las respuestas" });
      } else {
        return res.status(200).json(comments);
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
