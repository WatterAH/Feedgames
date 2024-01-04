import { URL } from "../App";

export const fetchComments = async (postId) => {
  const res = await fetch(
    `${URL}/api/getCommentsByPostId?postId=${encodeURIComponent(postId)}`
  );
  const resData = await res.json();

  if (res.ok) {
    return resData;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const fetchComment = async (commentId) => {
  const res = await fetch(
    `${URL}/api/getComment?commentId=${encodeURIComponent(commentId)}`
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

export const fetchResponses = async (commentId) => {
  const res = await fetch(
    `${URL}/api/getResponsesByCommentId?commentId=${encodeURIComponent(
      commentId
    )}`
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
