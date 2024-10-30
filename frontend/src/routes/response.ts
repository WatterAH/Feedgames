import { CommentInterface } from "@/interfaces/Comment";
const URL = process.env.NEXT_PUBLIC_SERVER_HOST;

export const getResponseById = async (
  id: string,
  userId: string
): Promise<{
  response: CommentInterface;
  responses: CommentInterface[];
}> => {
  const res = await fetch(
    `${URL}/api/getResponse?responseId=${encodeURIComponent(
      id
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

export const response = async (
  userId: string,
  postId: string,
  parentId: string | null,
  comment: string,
  image: File | null,
  toNotify: string,
  name: string
): Promise<CommentInterface> => {
  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("postId", postId);
  formData.append("comment", comment);
  formData.append("toNotify", toNotify);
  formData.append("name", name);
  if (parentId) formData.append("parentId", parentId);
  if (image) formData.append("image", image);

  const res = await fetch(`${URL}/api/response`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  const resData = await res.json();

  if (res.ok) {
    return resData as CommentInterface;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const deleteResponse = async (id: string): Promise<void> => {
  const res = await fetch(`${URL}/api/deleteResponse`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    const resData = await res.json();
    const { message } = resData;
    throw new Error(message);
  }
  return;
};

export const likeComment = async (
  id_user: string,
  id_comment: string,
  username: string,
  user_comment: string
): Promise<void> => {
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

export const dontLikeComment = async (
  id_user: string,
  id_comment: string
): Promise<void> => {
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
