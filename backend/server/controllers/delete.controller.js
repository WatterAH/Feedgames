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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.deleteNotify = exports.deletePost = void 0;
const delete_1 = require("../database/delete");
const commentGetter_1 = require("../database/commentGetter");
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        yield (0, delete_1.deletePostById)(id);
        return res.status(200).end();
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.deletePost = deletePost;
const deleteNotify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        yield (0, delete_1.deleteNotification)(id);
        return res.status(200).json({ message: "OK" });
    }
    catch (_a) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.deleteNotify = deleteNotify;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        let { comments, error } = yield (0, commentGetter_1.getResponses)(id);
        if (error) {
            return res.status(400).json({ message: "Erro al intentar eliminar" });
        }
        else {
            if (comments)
                comments = comments.map((comment) => comment.id_comment);
            yield (0, delete_1.deleteCommentsByIds)(comments);
            yield (0, delete_1.deleteCommentById)(id);
            return res.status(200).json({ message: "OK" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.deleteComment = deleteComment;
