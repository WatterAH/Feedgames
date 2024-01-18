import { supabase } from "./connection.js";

export const deletePostById = async (id_post) => {
  const { error } = await supabase.from("posts").delete().eq("id", id_post);
  if (error) {
    throw new Error(error);
  }
};

export const deleteCommentById = async (id_comment) => {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", id_comment);
  if (error) {
    throw new Error(error);
  }
};

export const deleteResponses = async (commentId) => {
  const { error } = await supabase
    .from("responses")
    .delete()
    .eq("id_comment", commentId);
  if (error) {
    throw new Error(error);
  }
};

export const deleteCommentsByIds = async (ids) => {
  const { error } = await supabase.from("comments").delete().in("id", ids);
  if (error) {
    throw new Error(error.message);
  }
};

export const deleteNotification = async (id) => {
  const { error } = await supabase.from("notify").delete().eq("id", id);
  if (error) {
    throw new Error(error);
  }
};

export const deleteImage = async (filename, folder) => {
  const { error } = await supabase.storage
    .from("Images")
    .remove(`${folder}/${filename}`);
  if (error) {
    throw new Error(error.message);
  }
};
