import {
  getFollowers,
  getFollows,
  getProfileById,
  getProfileByUsername,
  getProfilesByIds,
} from "../database/profileGetter";
import {
  getPostById,
  getPostsByContent,
  getUserPosts,
} from "../database/postGetter";
import { RequestHandler } from "express";
import { processPost, processUser } from "../libs/server";

export const getProfile: RequestHandler = async (req, res) => {
  try {
    const { id, myID } = req.query;
    const { user, error } = await getProfileById(id as string);
    if (error || !user) {
      return res.status(404).json({ message: "Not Found" });
    }
    processUser(user, myID as string);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const getProfilePosts: RequestHandler = async (req, res) => {
  try {
    const { id, page, limit, myID } = req.query;
    const responseId = id as string;
    const requestId = myID as string;
    const pageInt = parseInt(page as string, 10);
    const limitInt = parseInt(limit as string, 10);
    let { posts, error } = await getUserPosts(responseId, pageInt, limitInt);
    if (error || !posts) {
      return res.status(400).json({ message: "Error al cargar los posts" });
    }
    const processedPosts = posts.map((post) => processPost(post, requestId));
    return res.status(200).json(processedPosts);
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const getPost: RequestHandler = async (req, res) => {
  try {
    const { postId, userId } = req.query;
    let { data: post, error } = await getPostById(postId as string);
    if (error || !post) {
      return res.status(404).json({ message: "Not Found" });
    }
    const processedPost = processPost(post, userId as string);
    return res.status(200).json(processedPost);
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const searchUser: RequestHandler = async (req, res) => {
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

export const searchPost: RequestHandler = async (req, res) => {
  try {
    const { userId, searchTerm } = req.query;
    const id = userId as string;
    const term = searchTerm as string;
    let { data: posts, error } = await getPostsByContent(term);
    if (error || !posts) {
      return res
        .status(400)
        .json({ message: "No se pudo completar la busqueda" });
    } else {
      const result = posts.map((post) => processPost(post, id));
      return res.status(200).json(result);
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
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
