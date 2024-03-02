import { getAllPosts } from "../database/postGetter.js";

export const loadPosts = async (req, res) => {
  try {
    const { id_user } = req.query;
    let { posts } = await getAllPosts();
    posts = posts.map((post) => {
      const { liked, saved, comments, ...rest } = post;
      const isLiked = liked.some((like) => like.id_user == id_user);
      const isSaved = saved.some((save) => save.id_user == id_user);
      const isCommented = comments.some(
        (comment) => comment.id_user == id_user
      );
      return { ...rest, liked, saved, comments, isLiked, isSaved, isCommented };
    });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
