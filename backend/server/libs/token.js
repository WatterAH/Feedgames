import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
var JWT_KEY = process.env.JWT_KEY;
/**
 * Crea un token de acceso JWT.
 * @param payload Objeto que contiene la información que se incluirá en el token.
 * @returns Promesa que resuelve con el token generado.
 */
export var createAccessToken = function (payload) {
    return new Promise(function (resolve, reject) {
        jwt.sign(payload, JWT_KEY, { expiresIn: "30d" }, function (err, token) {
            if (err)
                reject(err);
            resolve(token);
        });
    });
};
/**
 * Verifica la validez de un token de acceso JWT y devuelve el objeto User decodificado.
 * @param token Token de acceso JWT.
 * @returns Promesa que resuelve con un objeto User decodificado o nulo si el token no es válido.
 */
export var validateToken = function (token) {
    return new Promise(function (resolve, reject) {
        if (!token) {
            return reject(null);
        }
        jwt.verify(token, JWT_KEY, function (err, decoded) {
            if (err) {
                return reject(null);
            }
            var user = decoded;
            return resolve(user);
        });
    });
};
