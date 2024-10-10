import { PostgrestError } from "@supabase/supabase-js";
import { PostInterface } from "../interfaces/Post";
import { supabase } from "./connection";

export const getUserPosts = async (
  userId: string,
  page: number,
  limit: number
): Promise<{ posts: PostInterface[] | null; error: PostgrestError | null }> => {
  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      "*, liked(id_user), saved(id_user), comments(id, id_user), user:users(username, pfp, name)"
    )
    .eq("user_id", userId)
    .order("order", { ascending: false })
    .range(page * limit, page * limit + limit - 1);
  return { posts, error };
};

export const getPostsByRange = async (
  page: number,
  limit: number
): Promise<{ posts: PostInterface[] | null; error: PostgrestError | null }> => {
  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      "*, liked(id_user), saved(id_user), comments(id, id_user), user:users(username, name, pfp)"
    )
    .order("order", { ascending: false })
    .range(page * limit, page * limit + limit - 1);

  return { posts, error };
};

export const getPostById = async (
  postId: string
): Promise<{ data: PostInterface | null; error: PostgrestError | null }> => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      "*, liked!left(id_user), saved(id_user), comments(id, id_user), user:users(username, name, pfp)"
    )
    .eq("id", postId)
    .single();
  return { data, error };
};

export const getPostsByContent = async (
  content: string
): Promise<{ data: PostInterface[] | null; error: PostgrestError | null }> => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      "*, liked(id_user), saved(id_user), comments(id, id_user), user:users(username, name, pfp)"
    )
    .ilike("content", `%${content}%`);
  return { data, error };
};

export const getSaved = async (userId: string, page: number, limit: number) => {
  const { data, error } = await supabase
    .from("saved")
    .select(
      "p:posts(*, user: users(username, name, pfp), liked(id_user), saved(id_user), comments(id, id_user))"
    )
    .eq("id_user", userId)
    .range(page * limit, page * limit + limit - 1);

  return { data, error };
};

export const getLiked = async (userId: string, page: number, limit: number) => {
  const { data, error } = await supabase
    .from("liked")
    .select(
      "p:posts(*, user: users(username, name, pfp), liked(id_user), saved(id_user), comments(id, id_user))"
    )
    .eq("id_user", userId)
    .range(page * limit, page * limit + limit - 1);

  return { data, error };
};
