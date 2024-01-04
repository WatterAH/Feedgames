import {
  deleteCommentById,
  deleteComments,
  deleteLikes,
  deletePostById,
  deleteResponses,
  deleteSaves,
  deleteNotification,
} from "../database/simpleDelete.js";

export const deletePost = async (req, res) => {
  try {
    const { id } = req.body;
    await Promise.all([deleteSaves(id), deleteLikes(id), deleteComments(id)]);
    await deletePostById(id);
    return res.status(200).json({ message: "OK" });
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
    await deleteCommentById(id);
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
