import shortUUID from "short-uuid";
import {
  getLiked,
  getPostsByContent,
  getPostsByRange,
  getSaved,
  getUserPosts,
} from "../database/postGetter";
import { RequestHandler } from "express";
import { processPost } from "../libs/server";

const translator = shortUUID();

export const loadSaved: RequestHandler = async (req, res) => {
  try {
    const { id, page, limit } = req.query;
    const userId = translator.toUUID(id as string);
    const pageInt = parseInt(page as string, 10);
    const limitInt = parseInt(limit as string, 10);

    const { data, error } = await getSaved(userId, pageInt, limitInt);

    if (error || !data) {
      res.status(400).json({ message: "Algo salió mal" });
      return;
    }

    const processedPosts = data.map((post) => processPost(post.p, userId));
    res.status(200).json(processedPosts);
  } catch (error) {
    res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const loadLiked: RequestHandler = async (req, res) => {
  try {
    const { id, page, limit } = req.query;
    const userId = translator.toUUID(id as string);
    const pageInt = parseInt(page as string, 10);
    const limitInt = parseInt(limit as string, 10);

    const { data, error } = await getLiked(userId, pageInt, limitInt);

    if (error || !data) {
      res.status(400).json({ message: "Error al obtener los posts" });
      return;
    }

    const processedPosts = data.map((post) => processPost(post.p, userId));

    res.status(200).json(processedPosts);
  } catch (error) {
    res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const getPostsByUser: RequestHandler = async (req, res) => {
  try {
    const { userId, requestId, page, limit } = req.query;
    const parsedUser = translator.toUUID(userId as string);
    const parsedReq = translator.toUUID(requestId as string);
    const pageInt = parseInt(page as string, 10);
    const limitInt = parseInt(limit as string, 10);

    const { posts, error } = await getUserPosts(parsedUser, pageInt, limitInt);

    if (error || !posts) {
      res.status(400).json({ message: "Error al cargar los posts" });
      return;
    }

    const processedPosts = posts.map((post) => processPost(post, parsedReq));

    res.status(200).json(processedPosts);
  } catch (error) {
    res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const loadTopLikedPosts: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.query;
    let parsedId = translator.toUUID(userId as string);

    const { posts, error } = await getPostsByRange(0, 50);

    if (error || !posts) {
      res.status(400).json({ message: "Error al cargar los posts" });
      return;
    }

    const topLikedPosts = posts
      .sort((a, b) => b.liked.length - a.liked.length)
      .slice(0, 5)
      .map((post) => processPost(post, parsedId));

    res.status(200).json(topLikedPosts);
  } catch (error) {
    res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const getCurrentTerm: RequestHandler = async (req, res) => {
  try {
    const { term, userId } = req.query;
    const parsedUserId = translator.toUUID(userId as string);

    const { data, error } = await getPostsByContent(term as string);
    if (error || !data) {
      res.status(400).json({ message: "Error al cargar los posts" });
      return;
    }

    const posts = data.map((post) => processPost(post, parsedUserId));
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
