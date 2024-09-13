import { RequestHandler } from "express";
import { getPostsByRange } from "../database/postGetter";
import { processPost } from "../libs/server";
import { popularUsers } from "../database/profileGetter";

export const loadSuggestions: RequestHandler = async (req, res) => {
  try {
    const { id_user } = req.query;
    let userId = id_user as string;
    let { posts } = await getPostsByRange(0, 100);
    if (posts?.length == 0 || !posts)
      return res.status(400).json({ message: "Ocurrio un problema" });
    posts = posts.sort((a, b) => b.liked.length - a.liked.length).slice(0, 4);
    const result = posts.map((post) => processPost(post, userId));
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const loadPopularUsers: RequestHandler = async (_req, res) => {
  try {
    let { data: users, error } = await popularUsers();
    if (error) {
      return res.status(400).json({ message: "Ocurrio un problema" });
    } else {
      if (users?.length == 0 || !users)
        return res.status(400).json({ message: "Ocurrio un problema" });
      users = users
        .sort((a, b) => b.followers.length - a.followers.length)
        .slice(0, 4);
      return res.status(200).json(users);
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
