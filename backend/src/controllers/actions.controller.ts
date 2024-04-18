import {
  getFollowers,
  getFollows,
  getProfileById,
  getProfileByUsername,
  getProfilesByIds,
} from "../database/profileGetter";
import { getPostById, myPostsIds } from "../database/postGetter";
import { RequestHandler } from "express";

export const getProfile: RequestHandler = async (req, res) => {
  try {
    const { id, myID } = req.query;
    const { user, error } = await getProfileById(id as string);
    if (error) {
      return res.status(404).json({ message: "Not Found" });
    }
    if (user) {
      // @ts-ignore
      user.follow = user.followers.some(
        (followers) => followers.id_follower == myID
      );
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const getProfilePosts: RequestHandler = async (req, res) => {
  try {
    const { id, myID } = req.query;
    let { posts, error } = await myPostsIds(id as string);
    if (error) {
      return res.status(400).json({ message: "Error al cargar los posts" });
    }
    if (posts) {
      posts = posts.map((post) => {
        const { liked, saved, comments, ...rest } = post;
        const isLiked = liked.some((like: any) => like.id_user == myID);
        const isSaved = saved.some((save: any) => save.id_user == myID);
        const isCommented = comments.some(
          (comment: any) => comment.id_user == myID
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

export const getPost: RequestHandler = async (req, res) => {
  try {
    const { postId, userId } = req.query;

    let { data: post, error } = await getPostById(postId as string);

    if (error) {
      return res.status(404).json({ message: "Not Found" });
    }
    post.isLiked = post.liked.some((like: any) => like.id_user == userId);
    post.isSaved = post.saved.some((save: any) => save.id_user == userId);
    post.isCommented = post.comments.some(
      (comment: any) => (comment.id_user = userId)
    );
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const searchTerm: RequestHandler = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    let { user, error } = await getProfileByUsername(searchTerm as string);
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

export const getFollowedById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.query;
    let { follows, error: errorFollows } = await getFollows(id as string);
    if (follows) follows = follows.map((follow) => follow.id_followed);
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

export const getFollowersById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.query;
    let { followers, error: errorFollower } = await getFollowers(id as string);
    if (followers)
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
