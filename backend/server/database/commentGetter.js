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
exports.getResponses = exports.getAllComents = exports.getCommentsByIds = exports.getCommentById = void 0;
const connection_1 = require("./connection");
const getCommentById = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: comment, error } = yield connection_1.supabase
        .from("comments")
        .select("*, responses!responses_id_responsed_fkey(id), user:users(username, name, pfp), comments_liked(id_user)")
        .eq("id", commentId)
        .single();
    return { comment, error };
});
exports.getCommentById = getCommentById;
const getCommentsByIds = (commentsIds) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: comments, error } = yield connection_1.supabase
        .from("comments")
        .select("*, responses!responses_id_responsed_fkey(id), user:users(username, name, pfp), comments_liked(id_user)")
        .in("id", commentsIds);
    return { comments, error };
});
exports.getCommentsByIds = getCommentsByIds;
const getAllComents = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: comments, error } = yield connection_1.supabase
        .from("comments")
        .select("*, responses!responses_id_responsed_fkey(id), user:users(username, name, pfp), comments_liked(id_user)")
        .eq("id_post", postId)
        .eq("response", false)
        .order("order", { ascending: false });
    return { comments, error };
});
exports.getAllComents = getAllComents;
const getResponses = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: comments, error } = yield connection_1.supabase
        .from("responses")
        .select("*, comments!responses_id_responsed_fkey()")
        .eq("id_responsed", commentId);
    return { comments, error };
});
exports.getResponses = getResponses;
