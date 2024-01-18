import { supabase } from "./connection.js";

export const editProfile = async (id, username, name, details, pfp) => {
  const { data: user, error } = await supabase
    .from("users")
    .update({ username, name, details, pfp })
    .eq("id", id)
    .select("id, created_at, name, username, details")
    .single();
  return { user, error };
};
