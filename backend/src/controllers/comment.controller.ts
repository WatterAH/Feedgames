import { supabase } from "../database/connection";
import { notify } from "../database/notifications";
import {
  getCommentById,
  getAllComents,
  getCommentsByIds,
  getResponses,
} from "../database/commentGetter";
import { RequestHandler } from "express";

export const getComment: RequestHandler = async (req, res) => {
  try {
    const { commentId, userId } = req.query;
    let { comment, error } = await getCommentById(commentId as string);
    if (error) {
      return res.status(404).json({ message: "Not Found" });
    }
    comment.isLiked = comment.comments_liked.some(
      (like: any) => like.id_user == userId
    );
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const comment: RequestHandler = async (req, res) => {
  try {
    const { id_user, name } = req.body;
    const { id_post, comment, response, toNotify } = req.body;
    if (!comment.trim()) {
      return res.status(400).json({ message: "Tu comentario esta vacio!" });
    }

    const insertData = { id_post, id_user, comment, response };
    let { data: commented, error } = await supabase
      .from("comments")
      .insert([insertData])
      .select(
        "*, responses!responses_id_responsed_fkey(id), user:users(username, name,pfp)"
      )
      .single();

    if (error) {
      return res.status(400).json({ message: "Error al subir comentario" });
    }
    if (toNotify != id_user) {
      const text = `Comentó tu publicación`;
      notify(toNotify, false, "p", id_post, text, name);
    }
    commented.isLiked = false;
    commented.comments_liked = [];
    return res.status(200).json(commented);
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const response: RequestHandler = async (req, res) => {
  try {
    const { id_user, name } = req.body;
    const { id_post, comment, response, toNotify } = req.body;
    const { comment_res } = req.body;

    const insertData = { id_post, id_user, comment, response };
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
          const text = `Respondió tu comentario`;
          notify(toNotify, false, "c", comment_res, text, name);
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

export const getCommentsByPostId: RequestHandler = async (req, res) => {
  try {
    const { postId, userId } = req.query;
    let { comments, error } = await getAllComents(postId as string);
    if (error) {
      return res
        .status(400)
        .json({ message: "Error al cargar los comentarios" });
    }
    if (comments) {
      comments = comments.map((comment) => {
        const { comments_liked, ...rest } = comment;
        const isLiked = comments_liked.some(
          (like: any) => like.id_user == userId
        );
        return { ...rest, comments_liked, isLiked };
      });
    }
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const getResponsesByCommentId: RequestHandler = async (req, res) => {
  try {
    const { commentId, userId } = req.query;
    let { comments: commentsIds, error } = await getResponses(
      commentId as string
    );
    if (error) {
      return res
        .status(400)
        .json({ message: "No se pudieron obtener las respuestas" });
    } else {
      if (commentsIds)
        commentsIds = commentsIds.map((comment: any) => comment.id_comment);
      let { comments, error } = await getCommentsByIds(commentsIds as string[]);
      if (error) {
        return res
          .status(400)
          .json({ message: "No se pudieron obtener las respuestas" });
      }
      if (comments) {
        comments = comments.map((comment) => {
          const { comments_liked, ...rest } = comment;
          const isLiked = comments_liked.some(
            (like: any) => like.id_user == userId
          );
          return { ...rest, comments_liked, isLiked };
        });
      }
      return res.status(200).json(comments);
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const likeComment: RequestHandler = async (req, res) => {
  try {
    const { id_user, id_comment, username, user_comment } = req.body;
    const insertData = { id_user, id_comment };
    const { error } = await supabase.from("comments_liked").insert(insertData);
    if (error) {
      return res.status(400).json({ message: "Ocurrió un error" });
    } else {
      if (id_user != user_comment) {
        const text = `Le gustó tu comentario`;
        notify(user_comment, false, "c", id_comment, text, username);
      }
      return res.status(200).json({ message: "OK" });
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const dontLikeComment: RequestHandler = async (req, res) => {
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
