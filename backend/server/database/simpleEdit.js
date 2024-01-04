import { supabase } from "./connection.js";

export const editCommentsName = async (id, username) => {
  const { error } = await supabase
    .from("comments")
    .update({ username })
    .eq("id_user", id);
  return { error };
};

export const editPostsName = async (id, username) => {
  const { error } = await supabase
    .from("posts")
    .update({ username })
    .eq("user_id", id);
  return { error };
};
