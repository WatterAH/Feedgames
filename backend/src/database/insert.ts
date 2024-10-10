import { User } from "../interfaces/User";
import { supabase } from "./connection";
import { v4 as uuidv4 } from "uuid";

export const registerUser = async (user: User) => {
  const { data, error } = await supabase
    .from("users")
    .insert([user])
    .select("id, name, username, details, pfp, riotId")
    .single();
  return { data, error };
};

export const uploadImage = async (
  image: { mimetype: any; buffer: any },
  folder: string
) => {
  const { mimetype, buffer } = image;
  const filename = uuidv4();
  const file = new Blob([buffer], { type: mimetype });
  const { error } = await supabase.storage
    .from("Images")
    .upload(`${folder}/${filename}`, file);
  return { filename, error };
};

export const insertFollow = async (followerId: string, followedId: string) => {
  const data = { id_follower: followerId, id_followed: followedId };
  const { error } = await supabase.from("follows").insert([data]);
  return { error };
};

export const stopFollow = async (followerId: string, followedId: string) => {
  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("id_follower", followerId)
    .eq("id_followed", followedId);
  return { error };
};

export const newParty = async (
  type: string,
  name: string,
  image: string | null
) => {
  const insertData = { type, name, image };
  const { data, error } = await supabase
    .from("partys")
    .insert([insertData])
    .select("*")
    .single();
  return { data, error };
};

export const joinParty = async (partyId: string, userId: string) => {
  const insertData = { id_party: partyId, id_user: userId };
  const { error } = await supabase.from("party_user").insert([insertData]);
  return { error };
};
