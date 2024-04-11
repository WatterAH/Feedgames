import bcryptjs from "bcryptjs";
import { supabase } from "../database/connection.js";
import { createAccessToken, validateToken } from "../libs/token.js";
import { editProfile } from "../database/edit.js";
import { deleteImage } from "../database/delete.js";
import { registerUser, uploadImage } from "../database/insert.js";
import { checkUsername, getProfileById } from "../database/profileGetter.js";

export const usernameAvailable = async (req, res) => {
  try {
    const { username } = req.body;
    const { data, error } = await checkUsername(username);
    if (error) {
      return res.status(400).json({ message: "Algo salió mal" });
    } else {
      if (data.length > 0) {
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

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { data: user, error: errorAuth } = await supabase
      .from("users")
      .select("*")
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
        const token = await createAccessToken(user);
        return res.status(200).json({ user, token });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).end();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const register = async (req, res) => {
  try {
    // Data from client
    const { name, username, details, password } = req.body;
    const image = req.file ? req.file : {};
    return console.log(image);
    // Hashing password
    const passHaash = await bcryptjs.hash(password, 8);
    // Data to insert
    const insertData = { name, username, details, password: passHaash };
    const { data: user, error: errorReg } = await registerUser(insertData);
    if (errorReg) {
      return res
        .status(400)
        .json({ message: "El nombre de usuario ya existe" });
    } else {
      const token = await createAccessToken(user);
      return res.status(200).json({ user, token });
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const { userToken, riotToken } = req.query;
    const user = await validateToken(userToken);
    const riot = (await validateToken(riotToken)) || {
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

export const editProfileById = async (req, res) => {
  try {
    const { id, username, name } = req.body;
    const details = req.body.details ? req.body.details : "Sin descripción.";
    const image = req.file ? req.file : {};
    const {
      user: { pfp: old_pfp },
    } = await getProfileById(id);
    let pfp = old_pfp;

    if (image.buffer) {
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
    console.log(error);
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
