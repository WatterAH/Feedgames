import { URL } from "../App";
import { supabase } from "../home/Connection";
import { v4 as uuidv4 } from "uuid";

export const fetchPosts = async (user) => {
  const res = await fetch(
    `${URL}/api/loadPosts?id_user=${encodeURIComponent(user)}`
  );
  const resData = await res.json();

  if (res.ok) {
    return resData;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const getPostById = async (id, userId) => {
  const res = await fetch(
    `${URL}/api/getPost?postId=${encodeURIComponent(
      id
    )}&userId=${encodeURIComponent(userId)}`
  );
  const resData = await res.json();
  if (res.ok) {
    return resData;
  } else if (res.status == 404) {
    return null;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const createPost = async (user_id, content, tags, publicUrl) => {
  const body = { user_id, content, tags, publicUrl };
  const res = await fetch(`${URL}/api/createNewPost`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const resData = await res.json();

  if (!res.ok) {
    const { message } = resData;
    throw new Error(message);
  }
  return;
};

export const uploadImage = async (image) => {
  const uuid = uuidv4();
  const { error } = await supabase.storage
    .from("Images")
    .upload(`images/${uuid}`, image);
  const data = `images/${uuid}`

  return { data, error };
};

export const deletePostById = async (id) => {
  const body = { id };
  const res = await fetch(`${URL}/api/deletePost`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const resData = await res.json();
  if (!res.ok) {
    const { message } = resData;
    throw new Error(message);
  }
  return;
};
