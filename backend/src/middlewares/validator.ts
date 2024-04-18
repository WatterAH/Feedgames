import { RequestHandler } from "express";
import { isCorrectUsername } from "../libs/validator";

export const validateUsername: RequestHandler = (req, res, next) => {
  const { username } = req.body;
  if (!isCorrectUsername(username)) {
    return res.status(400).json({
      message: "El usuario no es valido",
    });
  }
  return next();
};

export const validateBody: RequestHandler = (req, res, next) => {
  const { username, name } = req.body;
  if (!isCorrectUsername(username)) {
    return res.status(400).json({
      message: "Usuario: alfanumérico, ¡#$&/?-_@ permitidos",
    });
  }
  if (!name.trim()) {
    return res.status(400).json({ message: "Introduce un nombre" });
  }
  return next();
};
