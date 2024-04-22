import { RequestHandler } from "express";
import { getPostsByRange } from "../database/postGetter";
import { findMaxItem, joinObjects, uniques } from "../libs/arrays";

export const loadSuggestions: RequestHandler = async (_req, res) => {
  try {
    let { posts } = await getPostsByRange(0, 30);
    let likeLenghts = posts ? posts.map((post) => post.liked.length) : [];
    let savedLengths = posts ? posts.map((post) => post.saved.length) : [];
    let commentsLengths = posts
      ? posts.map((post) => post.comments.length)
      : [];

    const indexMaxLikes = findMaxItem(likeLenghts);
    const indexMaxSaves = findMaxItem(savedLengths);
    const indexMaxComments = findMaxItem(commentsLengths);
    const indexs = uniques([indexMaxLikes, indexMaxSaves, indexMaxComments]);
    posts = posts ? joinObjects(indexs, posts) : [];

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
