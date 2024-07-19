import bcryptjs from "bcryptjs";
import { supabase } from "../database/connection";
import { createAccessToken, validateToken } from "../libs/token";
import { editProfile } from "../database/edit";
import { deleteImage } from "../database/delete";
import { registerUser, uploadImage } from "../database/insert";
import { checkUsername, getProfileById } from "../database/profileGetter";
import { RequestHandler } from "express";
import { User } from "../interfaces/User";

export const usernameAvailable: RequestHandler = async (req, res) => {
  try {
    const { username } = req.body;
    const { data, error } = await checkUsername(username);
    if (error) {
      return res.status(400).json({ message: "Algo salió mal" });
    } else {
      if (!data || data.length > 0) {
        return res.status(403).json({
          message: "Lo sentimos, este nombre de usuario esta ocupado",
        });
      } else {
        return res.status(200).end();
      }
    }
  } catch (error) {
    return res.status(403).json({
      message: "El servidor tuvó un problema",
    });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { data: user, error: errorAuth } = await supabase
      .from("users")
      .select(
        "*, followed:follows!follows_id_follower_fkey(id_followed), followers:follows!follows_id_followed_fkey(id_follower)"
      )
      .eq("username", username)
      .single();
    if (errorAuth) {
      return res.status(403).json({ message: "Verifica tus credenciales" });
    } else {
      const correctPass = await bcryptjs.compare(password, user.password);
      if (!correctPass) {
        return res.status(403).json({ message: "Verifica tus credenciales" });
      } else {
        delete user.password;
        user.followers = user.followers.length;
        user.followed = user.followed.length;
        const token = await createAccessToken(user);
        return res.status(200).json({ user, token });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const logout: RequestHandler = (_req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).end();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const register: RequestHandler = async (req, res) => {
  try {
    const { name, username, details, password } = req.body;
    // @ts-ignore
    const image = req.file;
    const passHaash = await bcryptjs.hash(password, 8);
    let pfp = null;

    if (image) {
      const { filename, error } = await uploadImage(image, "pfp");
      if (error) {
        return res.status(500).json({ message: "Algo salió mal" });
      }
      pfp = filename;
    }

    const insertData = {
      name,
      username,
      details,
      password: passHaash,
      pfp,
    } as User;
    const { data: user } = await registerUser(insertData);
    const token = await createAccessToken(user);
    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const checkAuth: RequestHandler = async (req, res) => {
  try {
    const { userToken, riotToken } = req.query;
    const user = await validateToken(userToken as string);
    const riot = (await validateToken(riotToken as string)) || {
      puuid: "",
      gameName: "",
      tagLine: "",
    };
    if (!user) {
      return res.status(401).json({ message: "Token invalido o expirado" });
    } else {
      return res.status(200).json({ user, riot, userToken });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editProfileById: RequestHandler = async (req, res) => {
  try {
    const { id, username, name } = req.body;
    const details = req.body.details ? req.body.details : "Sin descripción.";
    const image = req.file;
    const {
      // @ts-ignore
      user: { pfp: old_pfp },
    } = await getProfileById(id);
    let pfp = old_pfp;

    if (image && image.buffer) {
      deleteImage(old_pfp, "pfp");
      const { filename, error } = await uploadImage(image, "pfp");
      pfp = filename;
      if (error) {
        return res.status(400).json({ message: "No se pudo subir la imagen" });
      }
    }
    const { user, error: errPf } = await editProfile(
      id,
      username,
      name,
      details,
      pfp
    );
    if (errPf) {
      return res
        .status(400)
        .json({ message: "Nombre de usuario no disponible" });
    } else {
      const token = await createAccessToken(user);
      return res.status(200).json({ user, token });
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
