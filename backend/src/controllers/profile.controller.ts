import shortUUID from "short-uuid";
import { RequestHandler } from "express";
import { getProfileById } from "../database/profileGetter";
import { processUser } from "../libs/server";
import { deleteImage } from "../database/delete";
import { uploadImage } from "../database/insert";
import { editProfileById } from "../database/edit";
import { createAccessToken } from "../libs/token";

const translator = shortUUID();

export const getProfile: RequestHandler = async (req, res) => {
  try {
    const { userId, requestId } = req.query;
    const parsedId = translator.toUUID(userId as string);
    const parsedReq = translator.toUUID(requestId as string);

    let { user, error } = await getProfileById(parsedId);

    if (error || !user) {
      return res.status(400).json({ message: "Error al cargar el usuario." });
    }

    const processedUser = processUser(user, parsedReq);

    return res.status(200).json(processedUser);
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const editProfile: RequestHandler = async (req, res) => {
  try {
    const { id, username, name, details = "Sin descripción." } = req.body;
    const userId = translator.toUUID(id);

    const image = req.file;

    const { user } = await getProfileById(userId);
    let pfp = user?.pfp;

    if (image && image.buffer) {
      if (pfp) deleteImage(pfp, "pfp");
      const { filename, error } = await uploadImage(image, "pfp");
      if (error) {
        return res.status(400).json({ message: "No se pudo subir la imagen" });
      }
      pfp = filename;
    }

    const { user: newUser, error } = await editProfileById(
      userId,
      username,
      name,
      details,
      pfp
    );
    if (error || !newUser) {
      return res
        .status(400)
        .json({ message: "Lo sentimos, nombre de usuario ya en uso" });
    }

    newUser.id = translator.fromUUID(newUser.id);
    const token = await createAccessToken(newUser);
    return res.status(200).json({ user: newUser, token });
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
