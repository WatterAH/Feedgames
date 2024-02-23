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
    const { commentId, userId } = req.query;
    let { comment, error } = await getCommentById(commentId);
    if (error) {
      return res.status(404).json({ message: "Not Found" });
    } else {
      comment.isLiked = comment.comments_liked.some(
        (like) => like.id_user == userId
      );
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
        notify(toNotify, false, "p", id_post, text, 1);
      }
      commented.isLiked = false;
      commented.comments_liked = [];
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
          notify(toNotify, false, "c", comment_res, text, 1);
        }
        commented.responses = [];
        commented.isLiked = false;
        commented.comments_liked = [];
        return res.status(200).json(commented);
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const getCommentsByPostId = async (req, res) => {
  try {
    const { postId, userId } = req.query;
    let { comments, error } = await getAllComents(postId);
    if (error) {
      return res
        .status(400)
        .json({ message: "Error al cargar los comentarios" });
    } else {
      comments = comments.map((comment) => {
        const { comments_liked, ...rest } = comment;
        const isLiked = comments_liked.some((like) => like.id_user == userId);
        return { ...rest, comments_liked, isLiked };
      });
      return res.status(200).json(comments);
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const getResponsesByCommentId = async (req, res) => {
  try {
    const { commentId, userId } = req.query;
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
        comments = comments.map((comment) => {
          const { comments_liked, ...rest } = comment;
          const isLiked = comments_liked.some((like) => like.id_user == userId);
          return { ...rest, comments_liked, isLiked };
        });
        return res.status(200).json(comments);
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const likeComment = async (req, res) => {
  try {
    const { id_user, id_comment, username, user_comment } = req.body;
    const insertData = { id_user, id_comment };
    const { error } = await supabase.from("comments_liked").insert(insertData);
    if (error) {
      return res.status(400).json({ message: "Ocurrió un error" });
    } else {
      if (id_user != user_comment) {
        const text = `A ${username} le gustó tu comentario`;
        notify(user_comment, false, "c", id_comment, text, 0);
      }
      return res.status(200).json({ message: "OK" });
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const dontLikeComment = async (req, res) => {
  try {
    const { id_user, id_comment } = req.body;
    const { error } = await supabase
      .from("comments_liked")
      .delete()
      .eq("id_user", id_user)
      .eq("id_comment", id_comment);
    if (error) {
      return res.status(400).json({ message: "Ocurrió un error" });
    } else {
      return res.status(200).json({ message: "OK" });
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
