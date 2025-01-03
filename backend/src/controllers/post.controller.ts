import shortUUID from "short-uuid";
import { supabase } from "../database/connection";
import {
  getLiked,
  getPostById,
  getPostsByContent,
  getPostsByRange,
  getSaved,
  getUserPosts,
} from "../database/postGetter";
import { uploadImage } from "../database/insert";
import { RequestHandler } from "express";
import { processPost } from "../libs/server";
import { deleteImage, deletePostById } from "../database/delete";
import { editPostById } from "../database/edit";

const translator = shortUUID();

export const createPost: RequestHandler = async (req, res) => {
  try {
    let { userId, content, valMatch, parentId } = req.body;

    const user_id = translator.toUUID(userId);
    parentId = parentId ? translator.toUUID(parentId) : null;
    valMatch = JSON.parse(valMatch);
    const image = req.file;

    if (!content.trim() && !image && !valMatch) {
      res.status(400).json({ message: "No se permiten posts vacios" });
      return;
    }

    const publicUrl = image?.buffer
      ? (await uploadImage(image, "images")).filename
      : null;
    if (image && !publicUrl) {
      res.status(400).json({ message: "No se pudo subir la imagen" });
      return;
    }

    const data = { user_id, content, publicUrl, valMatch, parentId };
    const { error } = await supabase.from("posts").insert([data]);

    if (error) {
      res.status(400).json({ message: "Error al crear el post" });
      return;
    }

    res.status(201).json({ message: "Hecho!" });
  } catch (error) {
    res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const editPost: RequestHandler = async (req, res) => {
  try {
    const { id, content } = req.body;
    const postId = translator.toUUID(id);

    if (!content.trim()) {
      res.status(400).json({ message: "No se permiten posts vacios" });
      return;
    }

    const { error } = await editPostById(postId, content);

    if (error) {
      res.status(400).json({ message: "Error al editar el post" });
      return;
    }

    res.status(200).json({ message: "Hecho!" });
  } catch (error) {
    res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const deletePost: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;
    const postId = translator.toUUID(id);

    const { data, error } = await getPostById(postId);
    if (error || !data) {
      res.status(400).end();
      return;
    }

    const { publicUrl } = data;
    if (publicUrl) {
      const { error } = await deleteImage(publicUrl, "images");
      if (error) {
        res.status(400).json({ message: "Error al eliminar la imagen" });
        return;
      }
    }

    const { error: deleteError } = await deletePostById(postId);
    if (deleteError) {
      res.status(400).json({ message: "Error al eliminar el post" });
    }

    res.status(200).end();
  } catch (error) {
    res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

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

export const getPost: RequestHandler = async (req, res) => {
  try {
    const { postId, userId } = req.query;
    const parsedUserId = translator.toUUID(userId as string);
    const parsedPostId = translator.toUUID(postId as string);

    const { data, error } = await getPostById(parsedPostId);

    if (error || !data) {
      res.status(400).json({ message: "Error al obtener el post" });
      return;
    }

    let responses = data.responses;
    responses = responses.map((response) =>
      processPost(response, parsedUserId)
    );
    //@ts-expect-error
    delete data.responses;

    const post = processPost(data, parsedUserId);

    res.status(200).json({ post, responses });
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
