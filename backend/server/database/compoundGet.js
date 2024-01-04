import { supabase } from "./connection.js";

export const myPostsIds = async (userId) => {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*, saved!left(id_user), users(username)")
    .eq("user_id", userId)
    .order("order", { ascending: false });
  return { posts, error };
};

export const getUsersExcept = async (userExcept) => {
  const { data: users, error } = await supabase
    .from("users")
    .select("id, username, name, details")
    .not("id", "eq", userExcept);
  return { users, error };
};

export const getLikedLength = async (postId) => {
  const { count, error } = await supabase
    .from("liked")
    .select("*", { count: "exact" })
    .eq("id_post", postId);
  if (error) {
    throw new Error(error);
  }
  return { length: count, id: postId, error };
};

export const getCommentLength = async (postId) => {
  const { count, error } = await supabase
    .from("comments")
    .select("*", { count: "exact" })
    .eq("post_id", postId);
  if (error) {
    throw new Error(error);
  }
  return { length: count, error };
};

export const getSavedLength = async (postId) => {
  const { count, error } = await supabase
    .from("saved")
    .select("*", { count: "exact" })
    .eq("id_post", postId);
  if (error) {
    throw new Error(error);
  }
  return { length: count, error };
};
