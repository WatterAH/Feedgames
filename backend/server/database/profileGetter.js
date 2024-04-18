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
exports.checkUsername = exports.countUsers = exports.getFollows = exports.getFollowers = exports.getProfileByUsername = exports.getProfilesByIds = exports.getProfileById = void 0;
const connection_1 = require("./connection");
const getProfileById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: user, error } = yield connection_1.supabase
        .from("users")
        .select("id, name, username, details, pfp, followed:follows!follows_id_follower_fkey(id_followed), followers:follows!follows_id_followed_fkey(id_follower)")
        .eq("id", userId)
        .single();
    return { user, error };
});
exports.getProfileById = getProfileById;
const getProfilesByIds = (usersIds) => __awaiter(void 0, void 0, void 0, function* () {
    if (usersIds) {
        const { data: users, error } = yield connection_1.supabase
            .from("users")
            .select("id, name, username, pfp")
            .in("id", usersIds);
        return { users, error };
    }
    return {};
});
exports.getProfilesByIds = getProfilesByIds;
const getProfileByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    if (!username) {
        return { user: [], error: null };
    }
    const { data: user, error } = yield connection_1.supabase
        .from("users")
        .select("id, name, username, details, pfp")
        .ilike("username", `${username}%`);
    return { user, error };
});
exports.getProfileByUsername = getProfileByUsername;
const getFollowers = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: followers, error } = yield connection_1.supabase
        .from("follows")
        .select("id_follower")
        .eq("id_followed", userId);
    return { followers, error };
});
exports.getFollowers = getFollowers;
const getFollows = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: follows, error } = yield connection_1.supabase
        .from("follows")
        .select("id_followed")
        .eq("id_follower", userId);
    return { follows, error };
});
exports.getFollows = getFollows;
const countUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const { count } = yield connection_1.supabase
        .from("users")
        .select("*", { count: "exact" });
    return { count };
});
exports.countUsers = countUsers;
const checkUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield connection_1.supabase
        .from("users")
        .select("*")
        .eq("username", username);
    return { data, error };
});
exports.checkUsername = checkUsername;
