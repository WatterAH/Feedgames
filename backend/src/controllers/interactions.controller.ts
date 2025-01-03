import shortUUID from "short-uuid";
import { supabase } from "../database/connection";
import { notify } from "../database/notifications";
import { follow, unfollow } from "../database/insert";
import { RequestHandler } from "express";
import { unlike, unsave } from "../database/delete";

const translator = shortUUID();

export const likePost: RequestHandler = async (req, res) => {
  try {
    const { userId, postId, username, postUser } = req.body;
    const post_user = translator.toUUID(postUser);
    const id_user = translator.toUUID(userId);
    const id_post = translator.toUUID(postId);

    await unlike(id_user, id_post);

    const data = { id_user, id_post };
    const { error } = await supabase.from("liked").insert([data]);

    if (error) res.status(400).end();

    if (userId != postUser) {
      const text = "Le gustó tu hilo";
      await notify(post_user, false, "p", postId, text, username);
    }

    res.status(200).end();
  } catch (error) {
    res.status(500).end();
  }
};

export const savePost: RequestHandler = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const id_user = translator.toUUID(userId);
    const id_post = translator.toUUID(postId);

    await unsave(userId, postId);

    const data = { id_user, id_post };
    const { error } = await supabase.from("saved").insert([data]);

    if (error) res.status(400).end();

    res.status(200).end();
  } catch (error) {
    res.status(500).end();
  }
};

export const unLikePost: RequestHandler = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const id_user = translator.toUUID(userId);
    const id_post = translator.toUUID(postId);

    const { error } = await unlike(id_user, id_post);

    if (error) res.status(400).end();

    res.status(200).end();
  } catch (error) {
    res.status(500).end();
  }
};

export const unSavePost: RequestHandler = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const id_user = translator.toUUID(userId);
    const id_post = translator.toUUID(postId);

    const { error } = await unsave(id_user, id_post);

    if (error) res.status(400).end();

    res.status(200).end();
  } catch (error) {
    res.status(500).end();
  }
};

export const followUser: RequestHandler = async (req, res) => {
  try {
    const { followerId, followedId, username } = req.body;
    const id_follower = translator.toUUID(followerId);
    const id_followed = translator.toUUID(followedId);
    await unfollow(id_follower, id_followed);

    const { error } = await follow(id_follower, id_followed);

    if (error) res.status(400).end();

    const text = "Comenzó a seguirte";
    notify(id_followed, false, "u", followerId, text, username);

    res.status(200).end();
  } catch (error) {
    res.status(500).end();
  }
};

export const unFollowUser: RequestHandler = async (req, res) => {
  try {
    const { followerId, followedId } = req.body;
    const id_follower = translator.toUUID(followerId);
    const id_followed = translator.toUUID(followedId);

    const { error } = await unfollow(id_follower, id_followed);

    if (error) res.status(400).end();

    res.status(200).end();
  } catch (error) {
    res.status(500).end();
  }
};
