import { supabase } from "../database/connection";
import { getLiked, getSaved } from "../database/postGetter";
import { uploadImage } from "../database/insert";
import { RequestHandler } from "express";
import { processPost } from "../libs/server";

export const createNewPost: RequestHandler = async (req, res) => {
  try {
    let { user_id, content, valMatch } = req.body;
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
      content,
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
    const { id, page, limit } = req.query;
    const userId = id as string;
    const pageInt = parseInt(page as string, 10);
    const limitInt = parseInt(limit as string, 10);
    const { data, error } = await getSaved(userId, pageInt, limitInt);
    if (error || !data) {
      return res.status(400).json({ message: "Algo salió mal" });
    } else {
      const processedPosts = data.map((post) => processPost(post.p, userId));
      return res.status(200).json(processedPosts);
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const loadLiked: RequestHandler = async (req, res) => {
  try {
    const { id, page, limit } = req.query;
    const userId = id as string;
    const pageInt = parseInt(page as string, 10);
    const limitInt = parseInt(limit as string, 10);
    const { data, error } = await getLiked(userId, pageInt, limitInt);
    if (error || !data) {
      return res.status(400).json({ message: "Algo salió mal" });
    } else {
      const processedPosts = data.map((post) => processPost(post.p, userId));
      return res.status(200).json(processedPosts);
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
