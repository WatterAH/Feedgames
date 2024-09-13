import { URL } from "../App";

export const likePost = async (
  id_user: string,
  id_post: string,
  username: string,
  user_post: string
): Promise<void> => {
  const body = { id_user, id_post, username, user_post };
  const res = await fetch(`${URL}/api/likePost`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const resData = await res.json();
    const { message } = resData;
    throw new Error(message);
  }
  return;
};

export const dontLikePost = async (
  id_user: string,
  id_post: string,
  username: string,
  user_post: string
): Promise<void> => {
  const body = { id_user, id_post, username, user_post };
  const res = await fetch(`${URL}/api/dontLikePost`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const resData = await res.json();
    const { message } = resData;
    throw new Error(message);
  }
  return;
};

export const savePost = async (
  id_user: string,
  id_post: string
): Promise<void> => {
  const body = { id_user, id_post };
  const res = await fetch(`${URL}/api/savePost`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const resData = await res.json();
    const { message } = resData;
    throw new Error(message);
  }
  return;
};

export const dontSavePost = async (
  id_user: string,
  id_post: string
): Promise<void> => {
  const body = { id_user, id_post };
  const res = await fetch(`${URL}/api/dontSavePost`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const resData = await res.json();
    const { message } = resData;
    throw new Error(message);
  }
  return;
};

export const followUser = async (
  id_follower: string,
  id_followed: string,
  username: string
): Promise<void> => {
  const body = { id_follower, id_followed, username };
  const res = await fetch(`${URL}/api/followUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const resData = await res.json();
    const { message } = resData;
    throw new Error(message);
  }
  return;
};

export const dontFollowUser = async (
  id_follower: string,
  id_followed: string,
  username: string
): Promise<void> => {
  const body = { id_follower, id_followed, username };
  const res = await fetch(`${URL}/api/stopFollowUser`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const resData = await res.json();
    const { message } = resData;
    throw new Error(message);
  }
  return;
};
