import { supabase } from "./connection.js";

export const myPostsIds = async (userId) => {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*, saved!left(id_user), user:users(username)")
    .eq("user_id", userId)
    .order("order", { ascending: false });
  return { posts, error };
};
