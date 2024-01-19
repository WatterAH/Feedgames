import { URL } from "../App";

export const fetchComments = async (postId, userId) => {
  const res = await fetch(
    `${URL}/api/getCommentsByPostId?postId=${encodeURIComponent(
      postId
    )}&userId=${encodeURIComponent(userId)}`
  );
  const resData = await res.json();

  if (res.ok) {
    return resData;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const fetchComment = async (commentId, userId) => {
  const res = await fetch(
    `${URL}/api/getComment?commentId=${encodeURIComponent(
      commentId
    )}&userId=${encodeURIComponent(userId)}`
  );
  const resData = await res.json();

  if (res.ok) {
    return resData;
  } else if (res.status == 404) {
    return null;
  } else {
    const { message } = error;
    throw new Error(message);
  }
};

export const fetchResponses = async (commentId, userId) => {
  const res = await fetch(
    `${URL}/api/getResponsesByCommentId?commentId=${encodeURIComponent(
      commentId
    )}&userId=${encodeURIComponent(userId)}`
  );
  const resData = await res.json();

  if (res.ok) {
    return resData;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const commentPost = async (body) => {
  const res = await fetch(`${URL}/api/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const resData = await res.json();

  if (res.ok) {
    return resData;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const responseComment = async (body) => {
  const res = await fetch(`${URL}/api/response`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const resData = await res.json();

  if (res.ok) {
    return resData;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const deleteComment = async (commentId) => {
  const body = { id: commentId };
  const res = await fetch(`${URL}/api/deleteComment`, {
    method: "DELETE",
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
};

export const likeComment = async (
  id_user,
  id_comment,
  username,
  user_comment
) => {
  const body = { id_user, id_comment, username, user_comment };
  const res = await fetch(`${URL}/api/likeComment`, {
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

export const dontLikeComment = async (id_user, id_comment) => {
  const body = { id_user, id_comment };
  const res = await fetch(`${URL}/api/dontLikeComment`, {
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
