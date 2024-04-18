import { supabase } from "./connection";

export const getCommentById = async (commentId: string) => {
  const { data: comment, error } = await supabase
    .from("comments")
    .select(
      "*, responses!responses_id_responsed_fkey(id), user:users(username, name, pfp), comments_liked(id_user)"
    )
    .eq("id", commentId)
    .single();
  return { comment, error };
};

export const getCommentsByIds = async (commentsIds: string[]) => {
  const { data: comments, error } = await supabase
    .from("comments")
    .select(
      "*, responses!responses_id_responsed_fkey(id), user:users(username, name, pfp), comments_liked(id_user)"
    )
    .in("id", commentsIds);
  return { comments, error };
};

export const getAllComents = async (postId: string) => {
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

export const getResponses = async (commentId: string) => {
  const { data: comments, error } = await supabase
    .from("responses")
    .select("*, comments!responses_id_responsed_fkey()")
    .eq("id_responsed", commentId);
  return { comments, error };
};
