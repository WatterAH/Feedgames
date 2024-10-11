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

export const getNotifyById = async (
  id: string,
  page: number,
  limit: number
) => {
  const { data: notify, error } = await supabase
    .from("notify")
    .select("*")
    .eq("id_user", id)
    .order("created_at", { ascending: false })
    .range(page * limit, page * limit + limit - 1);
  return { notify, error };
};

export const readAllByIds = async (ids: string[]) => {
  const { error } = await supabase
    .from("notify")
    .update({ read: true })
    .in("id", ids);
  return { error };
};
