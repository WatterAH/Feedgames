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
    const { id_post, id_user, name, comment, response, user_post } = req.body;
    if (!comment.trim()) {
      return res.status(400).json({ message: "Tu comentario esta vacio!" });
    }
    const created_at = getDate();
    let { data: commented, error } = await supabase
      .from("comments")
      .insert([
        {
          id_post,
          id_user,
          comment,
          created_at,
          response,
        },
      ])
      .select(
        "*, responses:responses!responses_id_responsed_fkey(id), users(username)"
      )
      .single();

    if (error) {
      return res.status(400).json({ message: "Error al subir comentario" });
    } else {
      if (user_post != id_user) {
        await notify(
          user_post,
          false,
          "Post",
          id_post,
          `${name} comento tu publicación`,
          1
        );
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
    const { id_post, id_user, name, comment, response } = req.body;
    const { id_responsed, id_user_responsed } = req.body;
    if (!comment.trim()) {
      return res.status(400).json({ message: "Tu comentario esta vacio!" });
    }
    const created_at = getDate();
    let { data: commented, error } = await supabase
      .from("comments")
      .insert([
        {
          id_post,
          id_user,
          comment,
          created_at,
          response,
        },
      ])
      .select("*, users(username)")
      .single();

    if (error) {
      return res.status(400).json({ message: "Error al subir comentario" });
    } else {
      const { error } = await supabase.from("responses").insert([
        {
          id_comment: commented.id,
          id_responsed,
        },
      ]);
      if (error) {
        return res.status(400).json({ message: "Error al subir comentario" });
      } else {
        if (id_user != id_user_responsed) {
          await notify(
            id_user_responsed,
            false,
            "Comment",
            commented.id,
            `${name} respondió tu comentario`,
            1
          );
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
