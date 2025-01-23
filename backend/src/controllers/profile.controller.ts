import shortUUID from "short-uuid";
import { RequestHandler } from "express";
import { getProfileById, searchUser } from "../database/profileGetter";
import { processUser } from "../libs/server";
import { deleteImage } from "../database/delete";
import { uploadImage } from "../database/insert";
import { editProfileById, editTheme } from "../database/edit";
import { createAccessToken } from "../libs/token";

const translator = shortUUID();

export const getProfile: RequestHandler = async (req, res) => {
  try {
    const { userId, requestId } = req.query;
    const parsedId = translator.toUUID(userId as string);
    const parsedReq = translator.toUUID(requestId as string);

    let { user, error } = await getProfileById(parsedId);

    if (error || !user) {
      res.status(400).json({ message: "Error al cargar el usuario." });
      return;
    }

    const processedUser = processUser(user, parsedReq);

    res.status(200).json(processedUser);
  } catch (error) {
    res.status(500).json({ message: "El servidor tuvo un problema" });
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
        res.status(400).json({ message: "No se pudo subir la imagen" });
        return;
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
      res
        .status(400)
        .json({ message: "Lo sentimos, nombre de usuario ya en uso" });
      return;
    }

    newUser.id = translator.fromUUID(newUser.id);
    const token = await createAccessToken(newUser);
    res.status(200).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const changeTheme: RequestHandler = async (req, res) => {
  try {
    const { userId, theme } = req.body;
    const parsedId = translator.toUUID(userId);

    const { data, error } = await editTheme(parsedId, theme);
    if (error || !data) {
      res.status(400).json({ message: "Ocurrió un error" });
      return;
    }
    res.status(200).json({ theme: data.theme });
  } catch (error) {
    res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const getUsersBySearchTerm: RequestHandler = async (req, res) => {
  try {
    const { searchterm, userId } = req.query;
    const parsedId = translator.toUUID(userId as string);

    const { data, error } = await searchUser(searchterm as string);

    if (error) {
      res.status(400).json({ message: "Ocurrió un error" });
      return;
    }

    const users = data?.map((user) => processUser(user, parsedId));
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
