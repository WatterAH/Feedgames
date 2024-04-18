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
exports.loadSuggestions = void 0;
const postGetter_1 = require("../database/postGetter");
const arrays_1 = require("../libs/arrays");
const loadSuggestions = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { posts } = yield (0, postGetter_1.getPostsByRange)(0, 30);
        let likeLenghts = posts ? posts.map((post) => post.liked.length) : [];
        let savedLengths = posts ? posts.map((post) => post.saved.length) : [];
        let commentsLengths = posts
            ? posts.map((post) => post.comments.length)
            : [];
        const indexMaxLikes = (0, arrays_1.findMaxItem)(likeLenghts);
        const indexMaxSaves = (0, arrays_1.findMaxItem)(savedLengths);
        const indexMaxComments = (0, arrays_1.findMaxItem)(commentsLengths);
        const indexs = (0, arrays_1.uniques)([indexMaxLikes, indexMaxSaves, indexMaxComments]);
        posts = (0, arrays_1.joinObjects)(indexs, posts);
        return res.status(200).json(posts);
    }
    catch (error) {
        return res.status(500).json({ message: "El servidor tuvo un problema" });
    }
});
exports.loadSuggestions = loadSuggestions;
