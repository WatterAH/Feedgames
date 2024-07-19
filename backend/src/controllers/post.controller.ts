import { supabase } from "../database/connection";
import {
  getLikedById,
  getPostsByIds,
  getSavedById,
} from "../database/postGetter";
import { uploadImage } from "../database/insert";
import { RequestHandler } from "express";
import { processPost } from "../libs/server";

export const createNewPost: RequestHandler = async (req, res) => {
  try {
    let { user_id, content, tags, valMatch } = req.body;
    tags = JSON.parse(tags);
    valMatch = JSON.parse(valMatch);

    const image = req.file;
    let publicUrl = null;
    if (!content.trim() && !image && !valMatch) {
      return res.status(400).json({ message: "No se permiten posts vacios" });
    }
    if (image?.buffer) {
      const { filename, error } = await uploadImage(image, "images");
      if (error) {
        return res.status(400).json({ message: "No se pudo subir la imagen" });
      }
      publicUrl = filename;
    }
    const data = {
      user_id,
      content: content.trim(),
      tags,
      publicUrl,
      valMatch,
    };
    const { error } = await supabase.from("posts").insert([data]);
    if (error) {
      return res.status(400).json({ message: "Algo salio mal" });
    }
    return res.status(200).json({ message: "Has creado un nuevo blog!" });
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const loadSaved: RequestHandler = async (req, res) => {
  try {
    const { id } = req.query;
    const idString = id as string;
    const { data, error } = await getSavedById(idString);
    if (error || !data) {
      return res.status(400).json({ message: "Algo salió mal" });
    } else {
      const postsIds = data.map((savedPost) => savedPost.id_post);
      const { data: posts, error: postsError } = await getPostsByIds(postsIds);
      if (postsError || !posts) {
        return res.status(400).json({ message: "Algo salió mal" });
      }
      const processedPosts = posts.map((post) => processPost(post, idString));
      return res.status(200).json(processedPosts);
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const loadLiked: RequestHandler = async (req, res) => {
  try {
    const { id } = req.query;
    const idString = id as string;
    const { data, error } = await getLikedById(idString);
    if (error || !data) {
      return res.status(400).json({ message: "Algo salió mal" });
    } else {
      const postsIds = data.map((likedPost) => likedPost.id_post);
      let { data: posts, error: postsError } = await getPostsByIds(postsIds);
      if (postsError || !posts) {
        return res.status(400).json({ message: "Algo salió mal" });
      }
      const processedPosts = posts.map((post) => processPost(post, idString));
      return res.status(200).json(processedPosts);
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
