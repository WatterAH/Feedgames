import { supabase } from "./connection";

export const deletePostById = async (postId: string) => {
  const { error } = await supabase.from("posts").delete().eq("id", postId);
  return { error };
};

export const deleteCommentById = async (commentId: string) => {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);
  return { error };
};

export const unlike = async (userId: string, postId: string) => {
  const { error } = await supabase
    .from("liked")
    .delete()
    .eq("id_user", userId)
    .eq("id_post", postId);
  return { error };
};

export const unsave = async (userId: string, postId: string) => {
  const { error } = await supabase
    .from("saved")
    .delete()
    .eq("id_user", userId)
    .eq("id_post", postId);
  return { error };
};

export const deleteNotification = async (id: string) => {
  const { error } = await supabase.from("notify").delete().eq("id", id);
  return { error };
};

export const deleteImage = async (
  filename: string,
  folder: "pfp" | "images"
) => {
  const { error } = await supabase.storage
    .from("Images")
    .remove([`${folder}/${filename}`]);
  return { error };
};
