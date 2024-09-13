import { RequestHandler } from "express";
import { getNotes, getPostsByRange } from "../database/postGetter";
import { processPost } from "../libs/server";
import { createNote } from "../database/insert";

export const loadPosts: RequestHandler = async (req, res) => {
  try {
    const { id_user, page, limit } = req.query;
    const userId = id_user as string;
    const parsedPage = parseInt(page as string, 10);
    const parsedLimit = parseInt(limit as string, 10);
    let { posts, error } = await getPostsByRange(parsedPage, parsedLimit);
    if (error || !posts) {
      return res.status(400).json({ message: "Algo salió mal" });
    }
    const processedPosts = posts.map((post) => processPost(post, userId));
    return res.status(200).json(processedPosts);
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const createNewNote: RequestHandler = async (req, res) => {
  try {
    const { id_user, note } = req.body;
    if (!note.trim() || note.length > 35) {
      return res.status(400).json({ message: "Debe haber una nota" });
    }
    const { data, error } = await createNote(id_user, note);
    if (error) {
      return res.status(400).json({ message: "Algo salió mal" });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const getAllNotes: RequestHandler = async (_req, res) => {
  try {
    const { data, error } = await getNotes();
    if (error) {
      return res.status(400).json({ message: "Error al cargar las notas" });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
