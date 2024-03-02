import { supabase } from "./connection.js";

export const getCommentById = async (commentId) => {
  const { data: comment, error } = await supabase
    .from("comments")
    .select(
      "*, responses!responses_id_responsed_fkey(id), user:users(username, name, pfp), comments_liked(id_user)"
    )
    .eq("id", commentId)
    .single();
  return { comment, error };
};

export const getCommentsByIds = async (commentsIds) => {
  const { data: comments, error } = await supabase
    .from("comments")
    .select(
      "*, responses!responses_id_responsed_fkey(id), user:users(username, name, pfp), comments_liked(id_user)"
    )
    .in("id", commentsIds);
  return { comments, error };
};

export const getAllComents = async (postId) => {
  const { data: comments, error } = await supabase
    .from("comments")
    .select(
      "*, responses!responses_id_responsed_fkey(id), user:users(username, name, pfp), comments_liked(id_user)"
    )
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
