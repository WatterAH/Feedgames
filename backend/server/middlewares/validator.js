"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = exports.validateUsername = void 0;
const validator_1 = require("../libs/validator");
const validateUsername = (req, res, next) => {
    const { username } = req.body;
    if (!(0, validator_1.isCorrectUsername)(username)) {
        return res.status(400).json({
            message: "El usuario no es valido",
        });
    }
    return next();
};
exports.validateUsername = validateUsername;
const validateBody = (req, res, next) => {
    const { username, name } = req.body;
    if (!(0, validator_1.isCorrectUsername)(username)) {
        return res.status(400).json({
            message: "Usuario: alfanumérico, ¡#$&/?-_@ permitidos",
        });
    }
    if (!name.trim()) {
        return res.status(400).json({ message: "Introduce un nombre" });
    }
    return next();
};
exports.validateBody = validateBody;
