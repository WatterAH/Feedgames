import { supabase } from "./connection";

export const notify = async (
  userId: string,
  read: boolean,
  content: string,
  id_linked: string,
  text: string,
  type: 0 | 1 | 2
) => {
  const { error } = await supabase.from("notify").insert([
    {
      id_user: userId,
      read,
      content,
      id_linked,
      text,
      type,
    },
  ]);
  return { error };
};

export const getNotificationsById = async (id: string) => {
  const { data: notifications, error } = await supabase
    .from("notify")
    .select("*")
    .eq("id_user", id)
    .order("created_at", { ascending: false });
  return { notifications, error };
};

export const readAllByIds = async (ids: string[]) => {
  const { error } = await supabase
    .from("notify")
    .update({ read: true })
    .in("id", ids);
  return { error };
};
