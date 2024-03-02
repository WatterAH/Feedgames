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
