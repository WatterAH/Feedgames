import { isCorrectUsername, isStrongPassword } from "../libs/validator.js";

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

export const validateReg = (req, res, next) => {
  const { name, username, details, password } = req.body;
  if (!isCorrectUsername(username)) {
    return res.status(400).json({
      message: "Usuario: alfanumérico, ¡#$&/?-_@ permitidos",
    });
  }
  if (!name.trim()) {
    return res.status(400).json({ message: "Introduce un nombre" });
  }
  if (!isStrongPassword(password)) {
    return res.status(400).json({ message: "La contraseña no es segura" });
  }
  next();
};
