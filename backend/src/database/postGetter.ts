import { supabase } from "./connection";

export const myPostsIds = async (userId: string) => {
  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      "*, liked!left(id_user), saved!left(id_user), comments(id, id_user), user:users(username, pfp, name)"
    )
    .eq("user_id", userId)
    .order("order", { ascending: false });
  return { posts, error };
};

export const getPostsByRange = async (page: number, limit: number) => {
  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      "*, liked!left(id_user), saved!left(id_user), comments(id, id_user), user:users(username, name, pfp)"
    )
    .order("order", { ascending: false })
    .range(page * limit, page * limit + limit - 1);

  return { posts, error };
};

export const getPostById = async (postId: string) => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      "*, liked!left(id_user), saved!left(id_user), comments(id, id_user), user:users(username, name, pfp)"
    )
    .eq("id", postId)
    .single();
  return { data, error };
};

export const getPostsByIds = async (postIds: string[]) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, saved!left(id_user), user:users(username, pfp, name)")
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
