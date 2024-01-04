import { supabase } from "./connection.js";

export const editProfile = async (id, username, name, details, changed) => {
  if (!changed) {
    const { data: user, error } = await supabase
      .from("users")
      .update({ name, details })
      .eq("id", id)
      .select("id, created_at, name, username, details")
      .single();
    return { user, error };
  } else {
    const { data: user, error } = await supabase
      .from("users")
      .update({ username, name, details })
      .eq("id", id)
      .select("id, created_at, name, username, details")
      .single();
    return { user, error };
  }
};
