import shortUUID from "short-uuid";
import bcryptjs from "bcryptjs";
import { supabase } from "../database/connection";
import { createAccessToken, validateToken } from "../libs/token";
import { registerUser, uploadImage } from "../database/insert";
import { RequestHandler } from "express";

const translator = shortUUID();

export const login: RequestHandler = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { data: user, error: errorAuth } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    const correctPass = await bcryptjs.compare(password, user.password);
    if (errorAuth || !user || !correctPass) {
      res.status(401).json({ message: "Verifica tus credenciales" });
      return;
    } else {
      user.id = translator.fromUUID(user.id);
      delete user.password;
      const token = await createAccessToken(user);
      res.status(200).json({ user, token });
    }
  } catch (error) {
    res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const register: RequestHandler = async (req, res) => {
  try {
    const { name, username, details, password } = req.body;
    let pfp = null;
    const image = req.file;
    const passHaash = await bcryptjs.hash(password, 8);

    if (image) {
      const { filename, error } = await uploadImage(image, "pfp");
      if (error) {
        res.status(500).json({ message: "Error al subir la imagen" });
        return;
      }
      pfp = filename;
    }

    const { user, error } = await registerUser(
      name,
      username,
      details,
      passHaash,
      pfp
    );

    if (error || !user) {
      res.status(500).json({ message: "Error al registrar usuario" });
      return;
    }

    user.id = translator.fromUUID(user.id);
    const token = await createAccessToken(user);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const checkSessionToken: RequestHandler = async (req, res) => {
  try {
    const { userToken } = req.query;
    const user = await validateToken(userToken as string);
    if (!user) {
      res.status(401).json({ message: "Token invalido o expirado" });
      return;
    }
    res.status(200).json({ user, userToken });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
