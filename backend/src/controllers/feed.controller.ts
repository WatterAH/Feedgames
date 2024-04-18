import { RequestHandler } from "express";
import { getPostsByRange } from "../database/postGetter";

export const loadPosts: RequestHandler = async (req, res) => {
  try {
    const { id_user, page, limit } = req.query;
    const parsedPage = parseInt(page as string, 10);
    const parsedLimit = parseInt(limit as string, 10);
    let { posts } = await getPostsByRange(parsedPage, parsedLimit);
    if (posts) {
      posts = posts.map((post) => {
        const { liked, saved, comments, ...rest } = post;
        const isLiked = liked.some((like: any) => like.id_user == id_user);
        const isSaved = saved.some((save: any) => save.id_user == id_user);
        const isCommented = comments.some(
          (comment: any) => comment.id_user == id_user
        );
        return {
          ...rest,
          liked,
          saved,
          comments,
          isLiked,
          isSaved,
          isCommented,
        };
      });
    }
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
