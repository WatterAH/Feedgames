import { supabase } from "./connection.js";

export const myPostsIds = async (userId) => {
  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      "*, liked!left(id_user), saved!left(id_user), comments(id, id_user), user:users(username, pfp, name)"
    )
    .eq("user_id", userId)
    .order("order", { ascending: false });
  return { posts, error };
};

export const getAllPosts = async () => {
  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      "*, liked!left(id_user), saved!left(id_user), comments(id, id_user), user:users(username, name, pfp)"
    )
    .order("order", { ascending: false });

  if (error) {
    throw new Error(error);
  }
  return { posts };
};

export const getPostById = async (postId) => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      "*, liked!left(id_user), saved!left(id_user), comments(id, id_user), user:users(username, name, pfp)"
    )
    .eq("id", postId)
    .single();
  return { data, error };
};

export const getPostsByIds = async (postIds) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, saved!left(id_user), user:users(username, pfp, name)")
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
