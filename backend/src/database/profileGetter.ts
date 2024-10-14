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

export const getProfilesByIds = async (
  usersIds:
    | {
        id_followed: any;
      }[]
    | {
        id_follower: any;
      }[]
    | null
) => {
  if (usersIds) {
    const { data: users, error } = await supabase
      .from("users")
      .select("id, name, username, pfp")
      .in("id", usersIds);
    return { users, error };
  }
  return {};
};

export const getProfilesByUsername = async (username: string) => {
  if (!username) {
    return { user: [], error: null };
  }
  const { data: user, error } = await supabase
    .from("users")
    .select("id, name, username, details, pfp")
    .ilike("username", `${username}%`);
  return { user, error };
};

export const getFollowers = async (userId: string) => {
  const { data: followers, error } = await supabase
    .from("follows")
    .select("id_follower")
    .eq("id_followed", userId);
  return { followers, error };
};

export const getFollows = async (userId: string) => {
  const { data: follows, error } = await supabase
    .from("follows")
    .select("id_followed")
    .eq("id_follower", userId);
  return { follows, error };
};

export const checkUsername = async (username: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username);
  return { data, error };
};
