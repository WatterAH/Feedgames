import { supabase } from "./connection.js";

export const insertFollow = async (id_follower, id_followed) => {
  const { error } = await supabase.from("follows").insert([
    {
      id_follower,
      id_followed,
    },
  ]);
  return { error };
};

export const stopFollow = async (id_follower, id_followed) => {
  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("id_follower", id_follower)
    .eq("id_followed", id_followed);
  return { error };
};
