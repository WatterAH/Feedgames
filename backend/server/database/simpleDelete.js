import { supabase } from "./connection.js";

export const deletePostById = async (id_post) => {
  const { error } = await supabase.from("posts").delete().eq("id", id_post);
  if (error) {
    throw new Error(error);
  }
};

export const deleteLikes = async (id_post) => {
  const { error } = await supabase
    .from("liked")
    .delete()
    .eq("id_post", id_post);
  if (error) {
    throw new Error(error);
  }
};

export const deleteSaves = async (id_post) => {
  const { error } = await supabase
    .from("saved")
    .delete()
    .eq("id_post", id_post);
  if (error) {
    throw new Error(error);
  }
};

export const deleteComments = async (id_post) => {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id_post", id_post);
  if (error) {
    throw new Error(error);
  }
};

export const deleteCommentById = async (id_comment) => {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", id_comment)
    .select("*");
  if (error) {
    console.log(error);
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

export const deleteNotification = async (id) => {
  const { error } = await supabase.from("notify").delete().eq("id", id);
  if (error) {
    throw new Error(error);
  }
};
