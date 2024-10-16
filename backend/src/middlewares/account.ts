import { RequestHandler } from "express";
import { checkUsername } from "../database/profileGetter";
import { isCorrectUsername, isStrongPassword } from "../libs/validator";

export const usernameAvailable: RequestHandler = async (req, res, next) => {
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
        return next();
      }
    }
  } catch (error) {
    return res.status(403).json({
      message: "El servidor tuvó un problema",
    });
  }
};

export const validateRegister: RequestHandler = async (req, res, next) => {
  const { name, username, password } = req.body;
  if (!isCorrectUsername(username)) {
    return res.status(400).json({
      message: "Usuario: alfanumérico, ¡#$&/?-_@ permitidos",
    });
  }
  if (!name.trim()) {
    return res.status(400).json({ message: "Introduce un nombre valido" });
  }
  if (!isStrongPassword(password)) {
    return res.status(400).json({ message: "La contraseña no es segura" });
  }
  return next();
};
