import { URL } from "../App";

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

export const createPost = async (user_id, title, content, tags) => {
  const body = { user_id, title, content, tags };
  const res = await fetch(`${URL}/api/createNewPost`, {
    method: "POST",
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
