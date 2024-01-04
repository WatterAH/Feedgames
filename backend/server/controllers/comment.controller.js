import { supabase } from "../database/connection.js";
import { notify } from "../database/notifications.js";
import {
  getAllComents,
  getCommentById,
  getCommentsByIds,
  getResponses,
} from "../database/simpleGet.js";
import { getDate } from "../libs/dates.js";
import { validateToken } from "../libs/token.js";

export const getComment = async (req, res) => {
  try {
    const { commentId } = req.query;
    let { comment, error } = await getCommentById(commentId);
    if (error) {
      return res
        .status(400)
        .json({ message: "El comentario no existe o fue eliminado" });
    } else {
      const {
        users: { username },
        ...rest
      } = comment;
      comment = { ...rest, username };
      return res.status(200).json(comment);
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const comment = async (req, res) => {
  try {
    const { id_post, comment, response, toNotify } = req.body;
    const token = req.cookies.token;
    if (!comment.trim()) {
      return res.status(400).json({ message: "Tu comentario esta vacio!" });
    }

    const user = await validateToken(token);
    if (!user) return res.status(403).json({ message: "Token invalido" });
    const { id: id_user } = user;
    const { username: name } = user;

    const created_at = getDate();

    const insertData = { id_post, id_user, comment, created_at, response };
    let { data: commented, error } = await supabase
      .from("comments")
      .insert([insertData])
      .select("*, responses!responses_id_responsed_fkey(id), users(username)")
      .single();

    if (error) {
      return res.status(400).json({ message: "Error al subir comentario" });
    } else {
      if (toNotify != id_user) {
        const text = `${name} comento tu publicación`;
        notify(toNotify, false, "Post", id_post, text, 1);
      }
      const {
        users: { username },
        ...rest
      } = commented;
      commented = { ...rest, username };
      return res.status(200).json(commented);
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const response = async (req, res) => {
  try {
    const { id_post, comment, response, toNotify } = req.body;
    const { comment_res } = req.body;
    const token = req.cookies.token;
    if (!comment.trim()) {
      return res.status(400).json({ message: "Tu comentario esta vacio!" });
    }
    const user = await validateToken(token);
    if (!user) return res.status(403).json({ message: "Token invalido" });
    const { id: id_user } = user;
    const { username: name } = user;

    const created_at = getDate();
    const insertData = { id_post, id_user, comment, created_at, response };
    let { data: commented, error } = await supabase
      .from("comments")
      .insert([insertData])
      .select("*, users(username)")
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
        const {
          users: { username },
          ...rest
        } = commented;
        commented = { ...rest, username };
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
      comments = comments.map((comment) => {
        const {
          users: { username },
          ...rest
        } = comment;
        return { ...rest, username };
      });
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
        comments = comments.map((comment) => {
          const {
            users: { username },
            ...rest
          } = comment;
          return { ...rest, username };
        });
        return res.status(200).json(comments);
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
