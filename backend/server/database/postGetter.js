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
exports.getSavedById = exports.getPostsByIds = exports.getPostById = exports.getPostsByRange = exports.myPostsIds = void 0;
const connection_1 = require("./connection");
const myPostsIds = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: posts, error } = yield connection_1.supabase
        .from("posts")
        .select("*, liked!left(id_user), saved!left(id_user), comments(id, id_user), user:users(username, pfp, name)")
        .eq("user_id", userId)
        .order("order", { ascending: false });
    return { posts, error };
});
exports.myPostsIds = myPostsIds;
const getPostsByRange = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: posts, error } = yield connection_1.supabase
        .from("posts")
        .select("*, liked!left(id_user), saved!left(id_user), comments(id, id_user), user:users(username, name, pfp)")
        .order("order", { ascending: false })
        .range(page * limit, page * limit + limit - 1);
    return { posts, error };
});
exports.getPostsByRange = getPostsByRange;
const getPostById = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield connection_1.supabase
        .from("posts")
        .select("*, liked!left(id_user), saved!left(id_user), comments(id, id_user), user:users(username, name, pfp)")
        .eq("id", postId)
        .single();
    return { data, error };
});
exports.getPostById = getPostById;
const getPostsByIds = (postIds) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield connection_1.supabase
        .from("posts")
        .select("*, saved!left(id_user), user:users(username, pfp, name)")
        .in("id", postIds);
    return { data, error };
});
exports.getPostsByIds = getPostsByIds;
const getSavedById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield connection_1.supabase
        .from("saved")
        .select("id_post")
        .eq("id_user", userId);
    return { data, error };
});
exports.getSavedById = getSavedById;
