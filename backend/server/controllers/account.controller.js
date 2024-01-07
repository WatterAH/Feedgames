import bcryptjs from "bcryptjs";
import { supabase } from "../database/connection.js";
import { isCorrectUsername, isStrongPassword } from "../libs/validator.js";
import { createAccessToken, validateToken } from "../libs/token.js";
import { editProfile } from "../database/compundEdit.js";

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
    res.cookie("token", "", { expires: new Date() });
    return res.status(200).json({ message: "Hasta pronto!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const register = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    let { details } = req.body;
    if (!isCorrectUsername(username)) {
      return res.status(400).json({
        message: "Usuario: alfanumérico, ¡#$&/?-_@ permitidos",
      });
    }
    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message: "Contraseña: min. 8 caracteres, !@#$%^&*_-/ permitidos",
      });
    }
    if (!name.trim()) {
      return res.status(400).json({ message: "Introduce un nombre" });
    }
    if (!details.trim()) {
      details = "Sin descripción";
    }
    const passHaash = await bcryptjs.hash(password, 8);
    const { data: user, error: errorReg } = await supabase
      .from("users")
      .insert([
        {
          name,
          username,
          details,
          password: passHaash,
        },
      ])
      .select("id, name, username, details")
      .single();
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
    const { token } = req.query;
    validateToken(token)
      .then((user) => {
        return res.status(200).json(user);
      })
      .catch(() => {
        return res.status(401).json({ message: "Token invalido o expirado" });
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editProfileById = async (req, res) => {
  try {
    const { id, username, name, changedUsername } = req.body;
    let { details } = req.body;
    if (!isCorrectUsername(username)) {
      return res.status(400).json({
        message: "Usuario: alfanumérico, ¡#$&/?-_@ permitidos",
      });
    }
    if (!name.trim()) {
      return res.status(400).json({ message: "Introduce un nombre" });
    }
    if (!details.trim()) {
      details = "Sin descripción";
    }

    const { user, error: errPf } = await editProfile(
      id,
      username,
      name,
      details,
      changedUsername
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
