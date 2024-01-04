import { supabase } from "./connection.js";

export const notify = async (id_user, read, content, id_linked, text, type) => {
  const { error } = await supabase.from("notify").insert([
    {
      id_user,
      read,
      content,
      id_linked,
      text,
      type,
    },
  ]);
  return { error };
};

export const getNotificationsById = async (id) => {
  const { data: notifications, error } = await supabase
    .from("notify")
    .select("*")
    .eq("id_user", id)
    .order("created_at", { ascending: false });
  return { notifications, error };
};

export const readAllByIds = async (ids) => {
  const { error } = await supabase
    .from("notify")
    .update({ read: true })
    .in("id", ids);
  return { error };
};
