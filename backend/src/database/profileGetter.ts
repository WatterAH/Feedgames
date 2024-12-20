import { supabase } from "./connection";

export const getProfileById = async (userId: string) => {
  const { data: user, error } = await supabase
    .from("users")
    .select(
      "id, name, username, details, pfp, created_at, followed:follows!follows_id_follower_fkey(count), followers:follows!follows_id_followed_fkey(id_follower)"
    )
    .eq("id", userId)
    .single();
  return { user, error };
};

export const checkUsername = async (username: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username);
  return { data, error };
};
