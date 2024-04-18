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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSaved = exports.createNewPost = void 0;
const connection_1 = require("../database/connection");
const postGetter_1 = require("../database/postGetter");
const insert_1 = require("../database/insert");
const dates_1 = require("../libs/dates");
const createNewPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { user_id, content, tags, valMatch } = req.body;
        tags = JSON.parse(tags);
        valMatch = JSON.parse(valMatch);
        const image = req.file;
        let publicUrl = null;
        if (!content.trim() && !image && !valMatch) {
            return res.status(400).json({ message: "No se permiten posts vacios" });
        }
        if (image && image.buffer) {
            const { filename, error } = yield (0, insert_1.uploadImage)(image, "images");
            publicUrl = filename;
            if (error) {
                return res.status(400).json({ message: "No se pudo subir la imagen" });
            }
        }
        const created_at = (0, dates_1.getDate)();
        const data = {
            user_id,
            created_at,
            content,
            tags,
            publicUrl,
            valMatch,
        };
        const { error } = yield connection_1.supabase.from("posts").insert([data]);
        if (error) {
            return res.status(400).json({ message: "Algo salio mal" });
        }
        return res.status(200).json({ message: "Has creado un nuevo blog!" });
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.createNewPost = createNewPost;
const loadSaved = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const { data, error } = yield (0, postGetter_1.getSavedById)(id);
        if (error) {
            return res.status(400).json({ message: "Algo salió mal" });
        }
        else {
            const postsIds = data ? data.map((savedPost) => savedPost.id_post) : [];
            let { data: posts, error: postsError } = yield (0, postGetter_1.getPostsByIds)(postsIds);
            if (postsError)
                return res.status(400).json({ message: "Algo salió mal" });
            if (posts) {
                posts = posts.map((post) => {
                    const { saved } = post, rest = __rest(post, ["saved"]);
                    const isSaved = saved.some((save) => save.id_user == id);
                    return Object.assign(Object.assign({}, rest), { isSaved });
                });
            }
            return res.status(200).json(posts);
        }
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.loadSaved = loadSaved;
