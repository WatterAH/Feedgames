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
exports.deleteImage = exports.deleteNotification = exports.deleteCommentsByIds = exports.deleteResponses = exports.deleteCommentById = exports.deletePostById = void 0;
const connection_1 = require("./connection");
const deletePostById = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield connection_1.supabase.from("posts").delete().eq("id", postId);
    return { error };
});
exports.deletePostById = deletePostById;
const deleteCommentById = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield connection_1.supabase
        .from("comments")
        .delete()
        .eq("id", commentId);
    return { error };
});
exports.deleteCommentById = deleteCommentById;
const deleteResponses = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield connection_1.supabase
        .from("responses")
        .delete()
        .eq("id_comment", commentId);
    return { error };
});
exports.deleteResponses = deleteResponses;
const deleteCommentsByIds = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield connection_1.supabase.from("comments").delete().in("id", ids);
    return { error };
});
exports.deleteCommentsByIds = deleteCommentsByIds;
const deleteNotification = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield connection_1.supabase.from("notify").delete().eq("id", id);
    return { error };
});
exports.deleteNotification = deleteNotification;
const deleteImage = (filename, folder) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield connection_1.supabase.storage
        .from("Images")
        .remove([`${folder}/${filename}`]);
    return { error };
});
exports.deleteImage = deleteImage;
