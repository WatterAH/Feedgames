import {
  getFollowers,
  getFollows,
  getProfileById,
  getProfileByUsername,
  getProfilesByIds,
} from "../database/profileGetter.js";
import { getPostById, myPostsIds } from "../database/postGetter.js";

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
        const { liked, saved, comments, ...rest } = post;
        const isLiked = liked.some((like) => like.id_user == myID);
        const isSaved = saved.some((save) => save.id_user == myID);
        const isCommented = comments.some((comment) => comment.id_user == myID);
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
      post.isCommented = post.comments.some(
        (comment) => (comment.id_user = userId)
      );
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

export const getFollowedById = async (req, res) => {
  try {
    const { id } = req.query;
    let { follows, error: errorFollows } = await getFollows(id);
    follows = follows.map((follow) => follow.id_followed);
    const { users, error: errorUsers } = await getProfilesByIds(follows);
    if (errorFollows || errorUsers) {
      return res.status(400).json({ message: "Error al cargar los usarios" });
    } else {
      return res.status(200).json(users);
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const getFollowersById = async (req, res) => {
  try {
    const { id } = req.query;
    let { followers, error: errorFollower } = await getFollowers(id);
    followers = followers.map((follower) => follower.id_follower);
    const { users, error: errorUsers } = await getProfilesByIds(followers);
    if (errorFollower || errorUsers) {
      return res.status(400).json({ message: "Error al cargar los usarios" });
    } else {
      return res.status(200).json(users);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
