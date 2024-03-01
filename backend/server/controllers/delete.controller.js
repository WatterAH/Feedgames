import {
  deleteCommentById,
  deletePostById,
  deleteNotification,
  deleteCommentsByIds,
} from "../database/simpleDelete.js";
import { getResponses } from "../database/simpleGet.js";

export const deletePost = async (req, res) => {
  try {
    const { id } = req.body;
    await deletePostById(id);
    return res.status(200).end();
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const deleteNotify = async (req, res) => {
  try {
    const { id } = req.body;
    await deleteNotification(id);
    return res.status(200).json({ message: "OK" });
  } catch {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.body;
    let { comments, error } = await getResponses(id);
    if (error) {
      return res.status(400).json({ message: "Erro al intentar eliminar" });
    } else {
      comments = comments.map((comment) => comment.id_comment);
      await deleteCommentsByIds(comments);
      await deleteCommentById(id);
      return res.status(200).json({ message: "OK" });
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
