import { supabase } from "./connection";

export const editProfile = async (
  id: string,
  username: string,
  name: string,
  details: string,
  pfp: string
) => {
  const { data: user, error } = await supabase
    .from("users")
    .update({ username, name, details, pfp })
    .eq("id", id)
    .select("id, created_at, name, username, details")
    .single();
  return { user, error };
};
