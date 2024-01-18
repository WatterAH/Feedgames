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

export const createPost = async (user_id, content, tags, image) => {
  const formData = new FormData();
  formData.append("user_id", user_id);
  formData.append("content", content);
  formData.append("tags", JSON.stringify(tags));
  formData.append("image", image);

  const res = await fetch(`${URL}/api/createNewPost`, {
    method: "POST",
    credentials: "include",
    body: formData,
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
  const data = `https://zptrwdrgobouoriwsfoj.supabase.co/storage/v1/object/public/Images/images/${uuid}`;

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
