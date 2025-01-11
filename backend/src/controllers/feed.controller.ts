import shortUUID from "short-uuid";
import { RequestHandler } from "express";
import { getPostsByRange } from "../database/postGetter";
import { processPost } from "../libs/server";

const translator = shortUUID();

export const loadPosts: RequestHandler = async (req, res) => {
  try {
    const { id_user, page, limit } = req.query;
    const userId = translator.toUUID(id_user as string);
    const parsedPage = parseInt(page as string, 10);
    const parsedLimit = parseInt(limit as string, 10);
    let { posts, error } = await getPostsByRange(parsedPage, parsedLimit);
    if (error || !posts) {
      res.status(400).json({ message: "Algo salió mal" });
      return;
    }
    const processedPosts = posts.map((post) => processPost(post, userId));
    res.status(200).json(processedPosts);
  } catch (error) {
    res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
