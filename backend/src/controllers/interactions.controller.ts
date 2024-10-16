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
    const id_user = translator.toUUID(userId);
    const id_post = translator.toUUID(postId);
    await unlike(id_user, id_post);

    const data = { id_user, id_post };
    const { error } = await supabase.from("liked").insert([data]);

    if (error) return res.status(400).end();

    if (userId != postUser) {
      const text = "Le gustó tu publicación";
      await notify(postUser, false, "p", postId, text, username);
    }

    return res.status(200).end();
  } catch (error) {
    return res.status(500).end();
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

    if (error) return res.status(400).end();

    return res.status(200).end();
  } catch (error) {
    return res.status(500).end();
  }
};

export const unLikePost: RequestHandler = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const id_user = translator.toUUID(userId);
    const id_post = translator.toUUID(postId);

    const { error } = await unlike(id_user, id_post);

    if (error) return res.status(400).end();

    return res.status(200).end();
  } catch (error) {
    return res.status(500).end();
  }
};

export const unSavePost: RequestHandler = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const id_user = translator.toUUID(userId);
    const id_post = translator.toUUID(postId);

    const { error } = await unsave(id_user, id_post);

    if (error) return res.status(400).end();

    return res.status(200).end();
  } catch (error) {
    return res.status(500).end();
  }
};

export const followUser: RequestHandler = async (req, res) => {
  try {
    const { followerId, followedId, username } = req.body;
    const id_follower = translator.toUUID(followerId);
    const id_followed = translator.toUUID(followedId);
    await unfollow(id_follower, id_followed);

    const { error } = await follow(id_follower, id_followed);

    if (error) return res.status(400).end();

    const text = "Comenzó a seguirte";
    notify(followedId, false, "u", followerId, text, username);

    return res.status(200).end();
  } catch (error) {
    return res.status(500).end();
  }
};

export const unFollowUser: RequestHandler = async (req, res) => {
  try {
    const { followerId, followedId } = req.body;
    const id_follower = translator.toUUID(followerId);
    const id_followed = translator.toUUID(followedId);

    const { error } = await unfollow(id_follower, id_followed);

    if (error) return res.status(400).end();

    return res.status(200).end();
  } catch (error) {
    return res.status(500).end();
  }
};
