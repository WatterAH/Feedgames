import { Notification } from "@/interfaces/Notification";
import { PostInterface } from "@/interfaces/Post";
import { createClient, PostgrestError } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const getPostById = async (
  postId: string
): Promise<{ post: PostInterface | null; error: PostgrestError | null }> => {
  const { data: post, error } = await supabase
    .from("posts")
    .select(
      "*, user:users(id, username, pfp, name, followers:follows!follows_id_followed_fkey(count))"
    )
    .eq("id", postId)
    .single();
  return { post, error };
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
