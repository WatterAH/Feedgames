import { supabase } from "./connection.js";
import { v4 as uuidv4 } from "uuid";

export const insertFollow = async (id_follower, id_followed) => {
  const { error } = await supabase.from("follows").insert([
    {
      id_follower,
      id_followed,
    },
  ]);
  return { error };
};

export const uploadImage = async (image, folder) => {
  const { mimetype, buffer } = image;
  const filename = uuidv4();
  const file = new Blob([buffer], { type: mimetype });
  const { error } = await supabase.storage
    .from("Images")
    .upload(`${folder}/${filename}`, file);
  return { filename, error };
};

export const stopFollow = async (id_follower, id_followed) => {
  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("id_follower", id_follower)
    .eq("id_followed", id_followed);
  return { error };
};

export const joinParty = async (id_user) => {
  const { error } = await supabase.from("partys").insert([
    {
      id_user,
    },
  ]);
  if (error) {
    throw new Error(error.message);
  }
};
