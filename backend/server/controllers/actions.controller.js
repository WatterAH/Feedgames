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
exports.getFollowersById = exports.getFollowedById = exports.searchTerm = exports.getPost = exports.getProfilePosts = exports.getProfile = void 0;
const profileGetter_1 = require("../database/profileGetter");
const postGetter_1 = require("../database/postGetter");
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, myID } = req.query;
        const { user, error } = yield (0, profileGetter_1.getProfileById)(id);
        if (error) {
            return res.status(404).json({ message: "Not Found" });
        }
        if (user) {
            // @ts-ignore
            user.follow = user.followers.some((followers) => followers.id_follower == myID);
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.getProfile = getProfile;
const getProfilePosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, myID } = req.query;
        let { posts, error } = yield (0, postGetter_1.myPostsIds)(id);
        if (error) {
            return res.status(400).json({ message: "Error al cargar los posts" });
        }
        if (posts) {
            posts = posts.map((post) => {
                const { liked, saved, comments } = post, rest = __rest(post, ["liked", "saved", "comments"]);
                const isLiked = liked.some((like) => like.id_user == myID);
                const isSaved = saved.some((save) => save.id_user == myID);
                const isCommented = comments.some((comment) => comment.id_user == myID);
                return Object.assign(Object.assign({}, rest), { liked,
                    saved,
                    comments,
                    isLiked,
                    isSaved,
                    isCommented });
            });
        }
        return res.status(200).json(posts);
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.getProfilePosts = getProfilePosts;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, userId } = req.query;
        let { data: post, error } = yield (0, postGetter_1.getPostById)(postId);
        if (error) {
            return res.status(404).json({ message: "Not Found" });
        }
        post.isLiked = post.liked.some((like) => like.id_user == userId);
        post.isSaved = post.saved.some((save) => save.id_user == userId);
        post.isCommented = post.comments.some((comment) => (comment.id_user = userId));
        return res.status(200).json(post);
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.getPost = getPost;
const searchTerm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        let { user, error } = yield (0, profileGetter_1.getProfileByUsername)(searchTerm);
        if (error) {
            return res
                .status(400)
                .json({ message: "No se pudo completar la busqueda" });
        }
        else {
            return res.status(200).json(user);
        }
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.searchTerm = searchTerm;
const getFollowedById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        let { follows, error: errorFollows } = yield (0, profileGetter_1.getFollows)(id);
        if (follows)
            follows = follows.map((follow) => follow.id_followed);
        const { users, error: errorUsers } = yield (0, profileGetter_1.getProfilesByIds)(follows);
        if (errorFollows || errorUsers) {
            return res.status(400).json({ message: "Error al cargar los usarios" });
        }
        else {
            return res.status(200).json(users);
        }
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.getFollowedById = getFollowedById;
const getFollowersById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        let { followers, error: errorFollower } = yield (0, profileGetter_1.getFollowers)(id);
        if (followers)
            followers = followers.map((follower) => follower.id_follower);
        const { users, error: errorUsers } = yield (0, profileGetter_1.getProfilesByIds)(followers);
        if (errorFollower || errorUsers) {
            return res.status(400).json({ message: "Error al cargar los usarios" });
        }
        else {
            return res.status(200).json(users);
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.getFollowersById = getFollowersById;
