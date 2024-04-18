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
exports.stopFollowUser = exports.followUser = exports.dontSavePost = exports.dontLikePost = exports.savePost = exports.likePost = exports.getNotifications = void 0;
const connection_1 = require("../database/connection");
const notifications_1 = require("../database/notifications");
const insert_1 = require("../database/insert");
const getNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const { notifications, error } = yield (0, notifications_1.getNotificationsById)(id);
        if (error) {
            return res
                .status(400)
                .json({ message: "No se pudieron obtener las notificaciones" });
        }
        if (notifications) {
            const ids = notifications.map((notification) => notification.id);
            (0, notifications_1.readAllByIds)(ids);
        }
        return res.status(200).json(notifications);
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.getNotifications = getNotifications;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_user, id_post, username, user_post } = req.body;
        const data = { id_user, id_post };
        const { error } = yield connection_1.supabase.from("liked").insert([data]);
        if (error)
            return res.status(400).end();
        if (id_user != user_post) {
            const text = `A ${username} le gusta tu publicación`;
            yield (0, notifications_1.notify)(user_post, false, "p", id_post, text, 0);
        }
        return res.status(200).end();
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.likePost = likePost;
const savePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_user, id_post } = req.body;
        const data = { id_user, id_post };
        const { error } = yield connection_1.supabase.from("saved").insert([data]);
        if (error)
            return res.status(400).end();
        return res.status(200).end();
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.savePost = savePost;
const dontLikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_user, id_post } = req.body;
        const { error } = yield connection_1.supabase
            .from("liked")
            .delete()
            .eq("id_user", id_user)
            .eq("id_post", id_post);
        if (error)
            return res.status(400).end();
        return res.status(200).end();
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.dontLikePost = dontLikePost;
const dontSavePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_user, id_post } = req.body;
        const { error } = yield connection_1.supabase
            .from("saved")
            .delete()
            .eq("id_user", id_user)
            .eq("id_post", id_post);
        if (error)
            return res.status(400).end();
        return res.status(200).end();
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.dontSavePost = dontSavePost;
const followUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_follower, id_followed, username } = req.body;
        const { error } = yield (0, insert_1.insertFollow)(id_follower, id_followed);
        if (error)
            return res.status(400).end();
        const text = `${username} comenzo a seguirte`;
        (0, notifications_1.notify)(id_followed, false, "u", id_follower, text, 2);
        return res.status(200).end();
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.followUser = followUser;
const stopFollowUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_follower, id_followed } = req.body;
        const { error } = yield (0, insert_1.stopFollow)(id_follower, id_followed);
        if (error)
            return res.status(400).end();
        return res.status(200).end();
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.stopFollowUser = stopFollowUser;
