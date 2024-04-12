import { isCorrectUsername, isStrongPassword } from "../libs/validator.js";

export const validateUsername = (req, res, next) => {
  const { username } = req.body;
  if (!isCorrectUsername(username)) {
    return res.status(400).json({
      message: "El usuario no es valido",
    });
  }
  next();
};

export const validateBody = (req, res, next) => {
  const { username, name } = req.body;
  if (!isCorrectUsername(username)) {
    return res.status(400).json({
      message: "Usuario: alfanumérico, ¡#$&/?-_@ permitidos",
    });
  }
  if (!name.trim()) {
    return res.status(400).json({ message: "Introduce un nombre" });
  }
  next();
};
