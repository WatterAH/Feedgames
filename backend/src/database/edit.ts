import { supabase } from "./connection";

export const editProfileById = async (
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
    .select("id, created_at, name, username, details, riotId, pfp")
    .single();
  return { user, error };
};
