import { RequestHandler } from "express";
import { checkUsername } from "../database/profileGetter";
import { isCorrectUsername, isStrongPassword } from "../libs/validator";

export const usernameAvailable: RequestHandler = async (req, res, next) => {
  try {
    const { username } = req.body;
    const { data, error } = await checkUsername(username);
    if (error) {
      res.status(400).json({ message: "Algo salió mal" });
      return;
    } else {
      if (!data || data.length > 0) {
        res.status(403).json({
          message: "Lo sentimos, este nombre de usuario esta ocupado",
        });
        return;
      } else {
        next();
      }
    }
  } catch (error) {
    res.status(403).json({
      message: "El servidor tuvó un problema",
    });
  }
};

export const validateRegister: RequestHandler = async (req, res, next) => {
  const { name, username, password } = req.body;
  if (!isCorrectUsername(username)) {
    res.status(400).json({
      message: "Usuario: alfanumérico, ¡#$&/?-_@ permitidos",
    });
    return;
  }
  if (!name.trim()) {
    res.status(400).json({ message: "Introduce un nombre valido" });
    return;
  }
  if (!isStrongPassword(password)) {
    res.status(400).json({ message: "La contraseña no es segura" });
    return;
  }
  next();
};
