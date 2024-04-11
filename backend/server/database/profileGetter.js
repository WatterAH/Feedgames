import { supabase } from "./connection.js";

export const getProfileById = async (userId) => {
  const { data: user, error } = await supabase
    .from("users")
    .select(
      "id, name, username, details, pfp, followed:follows!follows_id_follower_fkey(id_followed), followers:follows!follows_id_followed_fkey(id_follower)"
    )
    .eq("id", userId)
    .single();
  return { user, error };
};

export const getProfilesByIds = async (usersIds) => {
  const { data: users, error } = await supabase
    .from("users")
    .select("id, name, username, pfp")
    .in("id", usersIds);
  return { users, error };
};

export const getProfileByUsername = async (username) => {
  if (!username) {
    return { user: [], error: null };
  }
  const { data: user, error } = await supabase
    .from("users")
    .select("id, name, username, details, pfp")
    .ilike("username", `${username}%`);
  return { user, error };
};

export const getFollowers = async (userId) => {
  const { data: followers, error } = await supabase
    .from("follows")
    .select("id_follower")
    .eq("id_followed", userId);
  return { followers, error };
};

export const getFollows = async (userId) => {
  const { data: follows, error } = await supabase
    .from("follows")
    .select("id_followed")
    .eq("id_follower", userId);
  return { follows, error };
};

export const countUsers = async () => {
  const { count } = await supabase
    .from("users")
    .select("*", { count: "exact" });
  return { count };
};

export const checkUsername = async (username) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username);
  return { data, error };
};
