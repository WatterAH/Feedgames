import { supabase } from "./connection.js";

export const editProfile = async (id, username, name, details, changed) => {
  if (!changed) {
    const { error } = await supabase
      .from("users")
      .update({ name, details })
      .eq("id", id);

    return { error };
  } else {
    const { error } = await supabase
      .from("users")
      .update({ username, name, details })
      .eq("id", id);
    return { error };
  }
};
