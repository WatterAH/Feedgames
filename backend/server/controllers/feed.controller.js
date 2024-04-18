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
exports.loadPosts = void 0;
const postGetter_1 = require("../database/postGetter");
const loadPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_user, page, limit } = req.query;
        // @ts-ignore
        let { posts } = yield (0, postGetter_1.getPostsByRange)(page, limit);
        if (posts) {
            posts = posts.map((post) => {
                const { liked, saved, comments } = post, rest = __rest(post, ["liked", "saved", "comments"]);
                const isLiked = liked.some((like) => like.id_user == id_user);
                const isSaved = saved.some((save) => save.id_user == id_user);
                const isCommented = comments.some((comment) => comment.id_user == id_user);
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
exports.loadPosts = loadPosts;
