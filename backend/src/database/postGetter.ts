import { PostgrestError } from "@supabase/supabase-js";
import { PostInterface } from "../interfaces/Post";
import { supabase } from "./connection";

const QUERY =
  "*, liked(id_user), saved(id_user), responsed:posts(count), user:users(id, username, pfp, name, followers:follows!follows_id_followed_fkey(count))";

export const getUserPosts = async (
  userId: string,
  page: number,
  limit: number
): Promise<{ posts: PostInterface[] | null; error: PostgrestError | null }> => {
  const { data: posts, error } = await supabase
    .from("posts")
    .select(QUERY)
    .eq("user_id", userId)
    .is("parentId", null)
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
    .select(QUERY)
    .order("order", { ascending: false })
    .is("parentId", null)
    .range(page * limit, page * limit + limit - 1);

  return { posts, error };
};

export const getPostById = async (
  postId: string
): Promise<{ data: PostInterface | null; error: PostgrestError | null }> => {
  const { data, error } = await supabase
    .from("posts")
    .select(`${QUERY}, responses:posts(${QUERY})`)
    .eq("id", postId)
    .order("order", { referencedTable: "responses", ascending: false })
    .single();
  return { data, error };
};

export const getPostsByContent = async (
  content: string
): Promise<{ data: PostInterface[] | null; error: PostgrestError | null }> => {
  const { data, error } = await supabase
    .from("posts")
    .select(QUERY)
    .ilike("content", `%${content}%`)
    .limit(6);
  return { data, error };
};

export const getSaved = async (userId: string, page: number, limit: number) => {
  const { data, error } = await supabase
    .from("saved")
    .select(`p:posts(${QUERY})`)
    .eq("id_user", userId)
    .range(page * limit, page * limit + limit - 1);

  return { data, error };
};

export const getLiked = async (userId: string, page: number, limit: number) => {
  const { data, error } = await supabase
    .from("liked")
    .select(`p:posts(${QUERY})`)
    .eq("id_user", userId)
    .range(page * limit, page * limit + limit - 1);

  return { data, error };
};
