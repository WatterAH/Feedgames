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
exports.dontLikeComment = exports.likeComment = exports.getResponsesByCommentId = exports.getCommentsByPostId = exports.response = exports.comment = exports.getComment = void 0;
const connection_1 = require("../database/connection");
const notifications_1 = require("../database/notifications");
const commentGetter_1 = require("../database/commentGetter");
const dates_1 = require("../libs/dates");
const getComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId, userId } = req.query;
        let { comment, error } = yield (0, commentGetter_1.getCommentById)(commentId);
        if (error) {
            return res.status(404).json({ message: "Not Found" });
        }
        comment.isLiked = comment.comments_liked.some((like) => like.id_user == userId);
        return res.status(200).json(comment);
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.getComment = getComment;
const comment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_user, name } = req.body;
        const { id_post, comment, response, toNotify } = req.body;
        if (!comment.trim()) {
            return res.status(400).json({ message: "Tu comentario esta vacio!" });
        }
        const created_at = (0, dates_1.getDate)();
        const insertData = { id_post, id_user, comment, created_at, response };
        let { data: commented, error } = yield connection_1.supabase
            .from("comments")
            .insert([insertData])
            .select("*, responses!responses_id_responsed_fkey(id), user:users(username, name,pfp)")
            .single();
        if (error) {
            return res.status(400).json({ message: "Error al subir comentario" });
        }
        if (toNotify != id_user) {
            const text = `${name} comento tu publicación`;
            (0, notifications_1.notify)(toNotify, false, "p", id_post, text, 1);
        }
        commented.isLiked = false;
        commented.comments_liked = [];
        return res.status(200).json(commented);
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.comment = comment;
const response = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_user, name } = req.body;
        const { id_post, comment, response, toNotify } = req.body;
        const { comment_res } = req.body;
        const created_at = (0, dates_1.getDate)();
        const insertData = { id_post, id_user, comment, created_at, response };
        let { data: commented, error } = yield connection_1.supabase
            .from("comments")
            .insert([insertData])
            .select("*, user:users(username, name, pfp)")
            .single();
        if (error) {
            return res.status(400).json({ message: "Error al subir comentario" });
        }
        else {
            const { error } = yield connection_1.supabase
                .from("responses")
                .insert([{ id_comment: commented.id, id_responsed: comment_res }]);
            if (error) {
                return res.status(400).json({ message: "Error al subir comentario" });
            }
            else {
                if (id_user != toNotify) {
                    const text = `${name} respondió tu comentario`;
                    (0, notifications_1.notify)(toNotify, false, "c", comment_res, text, 1);
                }
                commented.responses = [];
                commented.isLiked = false;
                commented.comments_liked = [];
                return res.status(200).json(commented);
            }
        }
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.response = response;
const getCommentsByPostId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, userId } = req.query;
        let { comments, error } = yield (0, commentGetter_1.getAllComents)(postId);
        if (error) {
            return res
                .status(400)
                .json({ message: "Error al cargar los comentarios" });
        }
        if (comments) {
            comments = comments.map((comment) => {
                const { comments_liked } = comment, rest = __rest(comment, ["comments_liked"]);
                const isLiked = comments_liked.some((like) => like.id_user == userId);
                return Object.assign(Object.assign({}, rest), { comments_liked, isLiked });
            });
        }
        return res.status(200).json(comments);
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.getCommentsByPostId = getCommentsByPostId;
const getResponsesByCommentId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId, userId } = req.query;
        let { comments: commentsIds, error } = yield (0, commentGetter_1.getResponses)(commentId);
        if (error) {
            return res
                .status(400)
                .json({ message: "No se pudieron obtener las respuestas" });
        }
        else {
            if (commentsIds)
                commentsIds = commentsIds.map((comment) => comment.id_comment);
            let { comments, error } = yield (0, commentGetter_1.getCommentsByIds)(commentsIds);
            if (error) {
                return res
                    .status(400)
                    .json({ message: "No se pudieron obtener las respuestas" });
            }
            if (comments) {
                comments = comments.map((comment) => {
                    const { comments_liked } = comment, rest = __rest(comment, ["comments_liked"]);
                    const isLiked = comments_liked.some((like) => like.id_user == userId);
                    return Object.assign(Object.assign({}, rest), { comments_liked, isLiked });
                });
            }
            return res.status(200).json(comments);
        }
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.getResponsesByCommentId = getResponsesByCommentId;
const likeComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_user, id_comment, username, user_comment } = req.body;
        const insertData = { id_user, id_comment };
        const { error } = yield connection_1.supabase.from("comments_liked").insert(insertData);
        if (error) {
            return res.status(400).json({ message: "Ocurrió un error" });
        }
        else {
            if (id_user != user_comment) {
                const text = `A ${username} le gustó tu comentario`;
                (0, notifications_1.notify)(user_comment, false, "c", id_comment, text, 0);
            }
            return res.status(200).json({ message: "OK" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.likeComment = likeComment;
const dontLikeComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_user, id_comment } = req.body;
        const { error } = yield connection_1.supabase
            .from("comments_liked")
            .delete()
            .eq("id_user", id_user)
            .eq("id_comment", id_comment);
        if (error) {
            return res.status(400).json({ message: "Ocurrió un error" });
        }
        else {
            return res.status(200).json({ message: "OK" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.dontLikeComment = dontLikeComment;
