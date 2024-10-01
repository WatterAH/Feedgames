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

export const deleteResponses = async (commentId: string) => {
  const { error } = await supabase
    .from("responses")
    .delete()
    .eq("id_comment", commentId);
  return { error };
};

export const deleteCommentsByIds = async (ids: string[]) => {
  const { error } = await supabase.from("comments").delete().in("id", ids);
  return { error };
};

export const deleteNotification = async (id: string) => {
  const { error } = await supabase.from("notify").delete().eq("id", id);
  return { error };
};

export const deleteNoteById = async (id: string) => {
  const { error } = await supabase.from("notes").delete().eq("id", id);
  return { error };
};

export const deleteImage = async (filename: string, folder: string) => {
  const { error } = await supabase.storage
    .from("Images")
    .remove([`${folder}/${filename}`]);
  return { error };
};
