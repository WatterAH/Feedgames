import { supabase } from "./connection";
import { v4 as uuidv4 } from "uuid";

export const registerUser = async (
  name: string,
  username: string,
  details: string | null,
  password: string,
  pfp: string | null
) => {
  const data = {
    name,
    username,
    details,
    password,
    pfp,
  };
  const { data: user, error } = await supabase
    .from("users")
    .insert([data])
    .select("id, name, username, details, pfp, riotId")
    .single();
  return { user, error };
};

export const uploadImage = async (
  image: { mimetype: any; buffer: any },
  folder: "pfp" | "images"
) => {
  const { mimetype, buffer } = image;
  const filename = uuidv4();
  const file = new Blob([buffer], { type: mimetype });
  const { error } = await supabase.storage
    .from("Images")
    .upload(`${folder}/${filename}`, file);
  return { filename, error };
};

export const follow = async (followerId: string, followedId: string) => {
  const data = { id_follower: followerId, id_followed: followedId };
  const { error } = await supabase.from("follows").insert([data]);
  return { error };
};

export const unfollow = async (followerId: string, followedId: string) => {
  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("id_follower", followerId)
    .eq("id_followed", followedId);
  return { error };
};
