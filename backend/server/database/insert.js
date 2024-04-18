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
exports.joinParty = exports.stopFollow = exports.insertFollow = exports.uploadImage = exports.registerUser = void 0;
const connection_1 = require("./connection");
const uuid_1 = require("uuid");
const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield connection_1.supabase
        .from("users")
        .insert([user])
        .select("id, name, username, details, pfp")
        .single();
    return { data, error };
});
exports.registerUser = registerUser;
const uploadImage = (image, folder) => __awaiter(void 0, void 0, void 0, function* () {
    const { mimetype, buffer } = image;
    const filename = (0, uuid_1.v4)();
    const file = new Blob([buffer], { type: mimetype });
    const { error } = yield connection_1.supabase.storage
        .from("Images")
        .upload(`${folder}/${filename}`, file);
    return { filename, error };
});
exports.uploadImage = uploadImage;
const insertFollow = (followerId, followedId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = { id_follower: followerId, id_followed: followedId };
    const { error } = yield connection_1.supabase.from("follows").insert([data]);
    return { error };
});
exports.insertFollow = insertFollow;
const stopFollow = (followerId, followedId) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield connection_1.supabase
        .from("follows")
        .delete()
        .eq("id_follower", followerId)
        .eq("id_followed", followedId);
    return { error };
});
exports.stopFollow = stopFollow;
const joinParty = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield connection_1.supabase.from("partys").insert([
        {
            userId,
        },
    ]);
    if (error) {
        throw new Error(error.message);
    }
});
exports.joinParty = joinParty;
