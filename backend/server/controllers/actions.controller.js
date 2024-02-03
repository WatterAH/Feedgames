import { myPostsIds } from "../database/compoundGet.js";
import {
  getProfileById,
  getPostById,
  getProfileByUsername,
  getPostByTitle,
} from "../database/simpleGet.js";

export const getProfile = async (req, res) => {
  try {
    const { id, myID } = req.query;
    const { user, error } = await getProfileById(id);
    if (error) {
      return res.status(404).json({ message: "Not Found" });
    } else {
      user.follow = user.followers.some(
        (followers) => followers.id_follower == myID
      );
      return res.status(200).json(user);
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const getProfilePosts = async (req, res) => {
  try {
    const { id, myID } = req.query;
    let { posts, error } = await myPostsIds(id);
    if (error) {
      return res.status(400).json({ message: "Error al cargar los posts" });
    } else {
      posts = posts.map((post) => {
        const { liked, saved, ...rest } = post;
        const isLiked = liked.some((like) => like.id_user == myID);
        const isSaved = saved.some((save) => save.id_user == myID);
        return { ...rest, liked, saved, isLiked, isSaved };
      });
      return res.status(200).json(posts);
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const getPost = async (req, res) => {
  try {
    const { postId, userId } = req.query;

    let { data: post, error } = await getPostById(postId);

    if (error) {
      return res.status(404).json({ message: "Not Found" });
    } else {
      post.isLiked = post.liked.some((like) => like.id_user == userId);
      post.isSaved = post.saved.some((save) => save.id_user == userId);
      return res.status(200).json(post);
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const searchTerm = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    let { user, error } = await getProfileByUsername(searchTerm);
    if (error) {
      return res
        .status(400)
        .json({ message: "No se pudo completar la busqueda" });
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
