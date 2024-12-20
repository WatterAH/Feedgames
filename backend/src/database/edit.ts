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

export const editPostById = async (postId: string, content: string) => {
  const { data: post, error } = await supabase
    .from("posts")
    .update({ content, edited: true })
    .eq("id", postId);

  return { post, error };
};

export const editRiotId = async (userId: string) => {
  const { error } = await supabase
    .from("users")
    .update({ riotId: null })
    .eq("id", userId);

  return { error };
};
