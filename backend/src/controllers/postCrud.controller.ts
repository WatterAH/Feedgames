import shortUUID from "short-uuid";
import { supabase } from "../database/connection";
import { uploadImage } from "../database/insert";
import { editPostById } from "../database/edit";
import { deleteImage, deletePostById } from "../database/delete";
import { RequestHandler } from "express";
import { getPostById } from "../database/postGetter";
import { processPost } from "../libs/server";

const translator = shortUUID();

export const createPost: RequestHandler = async (req, res) => {
  try {
    let { userId, text, parentId, content } = req.body;

    const user_id = translator.toUUID(userId);
    parentId = parentId ? translator.toUUID(parentId) : null;
    content = JSON.parse(content);
    const image = req.file;

    if (!text.trim() && !image && !content) {
      res.status(400).json({ message: "No se permiten posts vacios" });
      return;
    }

    if (!content) {
      content = { type: "textonly", data: null };
    }

    const imageUrl = image?.buffer
      ? (await uploadImage(image, "images")).filename
      : null;
    if (image && !imageUrl) {
      res.status(400).json({ message: "No se pudo subir la imagen" });
      return;
    }
    if (imageUrl) {
      content = { type: "image", data: { url: imageUrl } };
    }

    const post = { user_id, text, parentId };
    const { data: created, error } = await supabase
      .from("posts")
      .insert([post])
      .select("id")
      .single();

    const { error: error2 } = await supabase
      .from("content")
      .insert([{ parent: created?.id, ...content }]);

    if (error || error2) {
      console.log(error || error2);
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

    const image = data.content[0];
    if (image.type == "image") {
      const { error } = await deleteImage(image.data.url, "images");
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
