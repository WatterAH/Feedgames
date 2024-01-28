import { getAllPosts } from "../database/simpleGet.js";
import { findMaxItem, joinObjects, uniques } from "../libs/arrays.js";

export const loadSuggestions = async (_req, res) => {
  try {
    let { posts } = await getAllPosts();
    let likeLenghts = posts.map((post) => post.liked.length);
    let savedLengths = posts.map((post) => post.saved.length);
    let commentsLengths = posts.map((post) => post.comments.length);

    const indexMaxLikes = findMaxItem(likeLenghts);
    const indexMaxSaves = findMaxItem(savedLengths);
    const indexMaxComments = findMaxItem(commentsLengths);
    const indexs = uniques([indexMaxLikes, indexMaxSaves, indexMaxComments]);
    posts = joinObjects(indexs, posts);

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
