import shortUUID from "short-uuid";
import { notify } from "../database/notifications";
import { Comment } from "../interfaces/Comment";
import { supabase } from "../database/connection";
import { getResponseById } from "../database/commentGetter";
import { RequestHandler } from "express";
import { responseContent, uploadImage } from "../database/insert";
import { processComment } from "../libs/server";
import { deleteImage, deleteResponseById } from "../database/delete";

const translator = shortUUID();

export const response: RequestHandler = async (req, res) => {
  try {
    const { postId, userId, comment, parentId } = req.body;
    const { toNotify, name } = req.body;
    const image = req.file;

    if (!comment.trim() && !image)
      return res.status(400).json({ message: "Tu comentario está vacío!" });

    const id_user = translator.toUUID(userId);
    const id_post = translator.toUUID(postId);
    const id_notified = translator.toUUID(toNotify);
    const id_parent = parentId ? translator.toUUID(parentId) : null;

    const imageUrl = image?.buffer
      ? (await uploadImage(image, "images")).filename
      : null;
    if (image && !imageUrl)
      return res.status(400).json({ message: "No se pudo subir la imagen" });

    const { response, error } = await responseContent(
      id_post,
      id_user,
      id_parent,
      comment,
      imageUrl
    );

    if (error) {
      return res.status(400).json({ message: "Error al subir comentario" });
    }

    if (id_notified !== id_user) {
      const text = id_parent ? "Respondió tu comentario" : "Comentó tu post";
      notify(toNotify, false, "p", id_post, text, name);
    }

    return res.status(200).json(response);
  } catch {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const getResponse: RequestHandler = async (req, res) => {
  try {
    const { responseId, userId } = req.query;

    const id_user = translator.toUUID(userId as string);
    const id_response = translator.toUUID(responseId as string);

    let { response, error } = await getResponseById(id_response);

    if (error) {
      return res.status(404).json({ message: "Not Found" });
    }

    let { responses }: { responses: Comment[] } = response;
    responses = responses.map((response) => processComment(response, id_user));

    response = processComment(response, id_user);
    delete response.responses;

    return res.status(200).json({ response, responses });
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const deleteResponse: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;
    const responseId = translator.toUUID(id);

    const { response, error } = await getResponseById(responseId);
    if (error || !response) return res.status(400).end();

    const { imageUrl } = response;
    if (imageUrl) {
      const { error } = await deleteImage(imageUrl, "images");
      if (error)
        return res.status(400).json({ message: "Error al eliminar la imagen" });
    }

    const { error: deleteError } = await deleteResponseById(responseId);
    if (deleteError) {
      return res
        .status(400)
        .json({ message: "Error al eliminar la respuesta" });
    }

    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const likeComment: RequestHandler = async (req, res) => {
  try {
    const { id_user, id_comment, username, user_comment } = req.body;
    const insertData = { id_user, id_comment };
    const { error } = await supabase.from("comments_liked").insert(insertData);
    if (error) {
      return res.status(400).json({ message: "Ocurrió un error" });
    } else {
      if (id_user != user_comment) {
        const text = `Le gustó tu comentario`;
        notify(user_comment, false, "c", id_comment, text, username);
      }
      return res.status(200).json({ message: "OK" });
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const dontLikeComment: RequestHandler = async (req, res) => {
  try {
    const { id_user, id_comment } = req.body;
    const { error } = await supabase
      .from("comments_liked")
      .delete()
      .eq("id_user", id_user)
      .eq("id_comment", id_comment);
    if (error) {
      return res.status(400).json({ message: "Ocurrió un error" });
    } else {
      return res.status(200).json({ message: "OK" });
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};