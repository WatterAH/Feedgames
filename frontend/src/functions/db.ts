import { Notification } from "@/interfaces/Notification";
import { createClient, PostgrestError } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const getPostById = async (postId: string) => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      "*, liked(id_user), saved(id_user), comments(id, id_user), user:users(username, name, pfp)"
    )
    .eq("id", postId)
    .single();
  return { data, error };
};

export const getNotifyById = async (
  notyId: string
): Promise<{ data: Notification; error: PostgrestError | null }> => {
  const { data, error } = await supabase
    .from("notify")
    .select("*, user:notifier(id, username, pfp)")
    .eq("id", notyId)
    .single();
  return { data, error };
};
