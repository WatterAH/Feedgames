import { supabase } from "./connection.js";

export const getProfileById = async (userId) => {
  const { data: user, error } = await supabase
    .from("users")
    .select(
      "id, name, username, details, pfp, followed:follows!follows_id_follower_fkey(id_followed), followers:follows!follows_id_followed_fkey(id_follower)"
    )
    .eq("id", userId)
    .single();
  return { user, error };
};

export const getProfilesByIds = async (usersIds) => {
  const { data: users, error } = await supabase
    .from("users")
    .select("id, name, username")
    .in("id", usersIds);
  return { users, error };
};

export const getProfileByUsername = async (username) => {
  if (!username) {
    return { user: [], error: null };
  }
  const { data: user, error } = await supabase
    .from("users")
    .select("id, name, username, details")
    .ilike("username", `${username}%`);
  return { user, error };
};

export const getAllPosts = async () => {
  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      "*, liked!left(id_user), saved!left(id_user), comments(id), user:users(username, name, pfp)"
    )
    .order("order", { ascending: false });

  if (error) {
    throw new Error(error);
  }
  return { posts };
};

export const getCommentById = async (commentId) => {
  const { data: comment, error } = await supabase
    .from("comments")
    .select("*, responses!responses_id_responsed_fkey(id), users(username)")
    .eq("id", commentId)
    .single();
  return { comment, error };
};

export const getCommentsByIds = async (commentsIds) => {
  const { data: comments, error } = await supabase
    .from("comments")
    .select("*, responses!responses_id_responsed_fkey(id), users(username)")
    .in("id", commentsIds);
  return { comments, error };
};

export const getAllComents = async (postId) => {
  const { data: comments, error } = await supabase
    .from("comments")
    .select("*, responses!responses_id_responsed_fkey(id), users(username)")
    .eq("id_post", postId)
    .eq("response", false)
    .order("order", { ascending: false });
  return { comments, error };
};

export const getResponses = async (commentId) => {
  const { data: comments, error } = await supabase
    .from("responses")
    .select("*, comments!responses_id_responsed_fkey()")
    .eq("id_responsed", commentId);
  return { comments, error };
};

export const getPostById = async (postId) => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      "*, liked!left(id_user), saved!left(id_user), comments(id), user:users(username, name, pfp)"
    )
    .eq("id", postId)
    .single();
  return { data, error };
};

export const getPostByTitle = async (title) => {
  if (!title) {
    return { post: [], error: null };
  }
  const { data: post, error } = await supabase
    .from("posts")
    .select("id, title, content, users(username)")
    .ilike("content", `%${title}%`);
  return { post, error };
};

export const getPostsByIds = async (postIds) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, saved!left(id_user), user:users(username)")
    .in("id", postIds);
  return { data, error };
};

export const getSavedById = async (userId) => {
  const { data, error } = await supabase
    .from("saved")
    .select("id_post")
    .eq("id_user", userId);
  if (error) {
    throw new Error(error);
  }
  return { data };
};

export const getFollowers = async (userId) => {
  const { data: followers, error } = await supabase
    .from("follows")
    .select("id_follower")
    .eq("id_followed", userId);
  return { followers, error };
};

export const getFollows = async (userId) => {
  const { data: follows, error } = await supabase
    .from("follows")
    .select("id_followed")
    .eq("id_follower", userId);
  return { follows, error };
};
