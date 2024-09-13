import { PostgrestError } from "@supabase/supabase-js";
import { PostInterface } from "../interfaces/Post";
import { supabase } from "./connection";

export const myPostsIds = async (
  userId: string
): Promise<{ posts: PostInterface[] | null; error: PostgrestError | null }> => {
  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      "*, liked(id_user), saved(id_user), comments(id, id_user), user:users(username, pfp, name)"
    )
    .eq("user_id", userId)
    .order("order", { ascending: false });
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

export const getPostsByIds = async (
  postIds: string[]
): Promise<{ data: PostInterface[] | null; error: PostgrestError | null }> => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      "*, liked(id_user), saved(id_user), comments(id, id_user), user:users(username, name, pfp)"
    )
    .order("order", { ascending: false })
    .in("id", postIds);
  return { data, error };
};

export const getSavedById = async (userId: string) => {
  const { data, error } = await supabase
    .from("saved")
    .select("id_post")
    .eq("id_user", userId);

  return { data, error };
};

export const getLikedById = async (userId: string) => {
  const { data, error } = await supabase
    .from("liked")
    .select("id_post")
    .eq("id_user", userId);

  return { data, error };
};

export const getNotes = async () => {
  const { data, error } = await supabase
    .from("notes")
    .select("*, user:users(username, pfp)")
    .order("created_at");
  return { data, error };
};
