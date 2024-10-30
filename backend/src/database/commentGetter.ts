import { supabase } from "./connection";

export const getResponseById = async (responseId: string) => {
  const { data: response, error } = await supabase
    .from("comments")
    .select(
      "*, user:users(id, username, name, pfp, followers:follows!follows_id_followed_fkey(count)), comments_liked(id_user), responses:comments(*, user:users(id, username, name, pfp), comments_liked(id_user))"
    )
    .eq("id", responseId)
    .single();
  return { response, error };
};
