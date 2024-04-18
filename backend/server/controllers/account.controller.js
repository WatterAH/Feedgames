"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProfileById = exports.checkAuth = exports.register = exports.logout = exports.login = exports.usernameAvailable = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const connection_1 = require("../database/connection");
const token_1 = require("../libs/token");
const edit_1 = require("../database/edit");
const delete_1 = require("../database/delete");
const insert_1 = require("../database/insert");
const profileGetter_1 = require("../database/profileGetter");
const usernameAvailable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        const { data, error } = yield (0, profileGetter_1.checkUsername)(username);
        if (error) {
            return res.status(400).json({ message: "Algo salió mal" });
        }
        else {
            if (!data || data.length > 0) {
                return res.status(403).json({
                    message: "Lo sentimos, este nombre de usuario esta ocupado",
                });
            }
            else {
                return res.status(200).end();
            }
        }
    }
    catch (error) {
        return res.status(403).json({
            message: "El servidor tuvó un problema",
        });
    }
});
exports.usernameAvailable = usernameAvailable;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const { data: user, error: errorAuth } = yield connection_1.supabase
            .from("users")
            .select("*")
            .eq("username", username)
            .single();
        if (errorAuth) {
            return res.status(403).json({ message: "Verifica tus credenciales" });
        }
        else {
            const correctPass = yield bcryptjs_1.default.compare(password, user.password);
            if (!correctPass) {
                return res.status(403).json({ message: "Verifica tus credenciales" });
            }
            else {
                delete user.password;
                const token = yield (0, token_1.createAccessToken)(user);
                return res.status(200).json({ user, token });
            }
        }
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.login = login;
const logout = (_req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).end();
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.logout = logout;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, username, details, password } = req.body;
        // @ts-ignore
        const image = req.file;
        const passHaash = yield bcryptjs_1.default.hash(password, 8);
        let pfp = null;
        if (image) {
            const { filename, error } = yield (0, insert_1.uploadImage)(image, "pfp");
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
        };
        const { data: user } = yield (0, insert_1.registerUser)(insertData);
        const token = yield (0, token_1.createAccessToken)(user);
        return res.status(200).json({ user, token });
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.register = register;
const checkAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userToken, riotToken } = req.query;
        const user = yield (0, token_1.validateToken)(userToken);
        const riot = (yield (0, token_1.validateToken)(riotToken)) || {
            puuid: "",
            gameName: "",
            tagLine: "",
        };
        if (!user) {
            return res.status(401).json({ message: "Token invalido o expirado" });
        }
        else {
            return res.status(200).json({ user, riot, userToken });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.checkAuth = checkAuth;
const editProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, username, name } = req.body;
        const details = req.body.details ? req.body.details : "Sin descripción.";
        const image = req.file;
        const { 
        // @ts-ignore
        user: { pfp: old_pfp }, } = yield (0, profileGetter_1.getProfileById)(id);
        let pfp = old_pfp;
        if (image && image.buffer) {
            (0, delete_1.deleteImage)(old_pfp, "pfp");
            const { filename, error } = yield (0, insert_1.uploadImage)(image, "pfp");
            pfp = filename;
            if (error) {
                return res.status(400).json({ message: "No se pudo subir la imagen" });
            }
        }
        const { user, error: errPf } = yield (0, edit_1.editProfile)(id, username, name, details, pfp);
        if (errPf) {
            return res
                .status(400)
                .json({ message: "Nombre de usuario no disponible" });
        }
        else {
            const token = yield (0, token_1.createAccessToken)(user);
            return res.status(200).json({ user, token });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.editProfileById = editProfileById;
