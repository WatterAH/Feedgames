import { RequestHandler } from "express";
import { getPostsByRange } from "../database/postGetter";
import { processPost } from "../libs/server";

export const loadSuggestions: RequestHandler = async (req, res) => {
  try {
    const { id_user } = req.query;
    let userId = id_user as string;
    let { posts, error } = await getPostsByRange(0, 100);
    if (posts?.length == 0 || !posts) {
      console.log(error);
      return res.status(400).json({ message: "Ocurrio un problema" });
    }
    posts = posts.sort((a, b) => b.liked.length - a.liked.length).slice(0, 4);
    const result = posts.map((post) => processPost(post, userId));
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
