import { getUsersExcept } from "../database/compoundGet.js";
import { getAllPosts } from "../database/simpleGet.js";
import { findMaxItem, joinObjects, uniques } from "../libs/arrays.js";
import { getRandomElements } from "../libs/random.js";

export const getRandomUsers = async (req, res) => {
  try {
    const { id } = req.query;
    let { users, error } = await getUsersExcept(id);
    if (error) {
      return res
        .status(400)
        .json({ message: "No se pudieron cargar las sugerencias" });
    } else {
      users = getRandomElements(users, 3);
      return res.status(200).json(users);
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const loadSuggestions = async (req, res) => {
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

    posts = posts.map((post) => {
      const {
        users: { username },
        ...rest
      } = post;
      return { ...rest, username };
    });

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
