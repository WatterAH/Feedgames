import {
  deleteCommentById,
  deletePostById,
  deleteNotification,
  deleteCommentsByIds,
  deleteNoteById,
} from "../database/delete";
import { getResponses } from "../database/commentGetter";
import { RequestHandler } from "express";

export const deletePost: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;
    await deletePostById(id);
    return res.status(200).end();
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const deleteNotify: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;
    await deleteNotification(id);
    return res.status(200).end();
  } catch {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const deleteComment: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;
    let { comments, error } = await getResponses(id);
    if (error) {
      return res.status(400).json({ message: "Error al intentar eliminar" });
    } else {
      if (comments)
        comments = comments.map((comment: any) => comment.id_comment);
      await deleteCommentsByIds(comments as string[]);
      await deleteCommentById(id);
      return res.status(200).end();
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const deleteNote: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;
    const { error } = await deleteNoteById(id);
    if (error) {
      return res.status(400).json({ message: "No se pudo eliminar la nota" });
    } else {
      return res.status(200).end();
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
