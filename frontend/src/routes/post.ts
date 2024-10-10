import { PostInterface } from "@/interfaces/Post";
import { MatchShowCase } from "@/interfaces/Valorant";
const URL = process.env.NEXT_PUBLIC_SERVER_HOST;

export const feedPosts = async (
  user: string,
  page: number,
  limit: number
): Promise<PostInterface[]> => {
  const endpoint = `${URL}/api/loadPosts?id_user=${user}&page=${page}&limit=${limit}`;
  const res = await fetch(endpoint);
  const resData = await res.json();

  if (res.ok) {
    return resData;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const getPostById = async (
  id: string,
  userId: string
): Promise<PostInterface | null> => {
  const res = await fetch(
    `${URL}/api/getPost?postId=${encodeURIComponent(
      id
    )}&userId=${encodeURIComponent(userId)}`
  );
  const resData: PostInterface | any = await res.json();
  if (res.ok) {
    return resData;
  } else if (res.status == 404) {
    return null;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const createPost = async (
  user_id: string,
  content: string,
  image: File | null,
  valMatch: MatchShowCase | null
): Promise<void> => {
  const formData = new FormData();
  formData.append("user_id", user_id);
  formData.append("content", content);
  formData.append("valMatch", JSON.stringify(valMatch));
  if (image) {
    formData.append("image", image);
  }

  const res = await fetch(`${URL}/api/createNewPost`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    const resData = await res.json();
    const { message } = resData;
    throw new Error(message);
  }
  return;
};

export const deletePostById = async (id: string): Promise<void> => {
  const body = { id };
  const res = await fetch(`${URL}/api/deletePost`, {
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

export const likedPosts = async (
  userId: string,
  page: number,
  limit: number
): Promise<PostInterface[]> => {
  const endpoint = `${URL}/api/loadLiked?id=${userId}&page=${page}&limit=${limit}`;
  const res = await fetch(endpoint);
  const resData = await res.json();

  if (res.ok) {
    return resData;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const savedPosts = async (
  userId: string,
  page: number,
  limit: number
): Promise<PostInterface[]> => {
  const endpoint = `${URL}/api/loadSaved?id=${userId}&page=${page}&limit=${limit}`;
  const res = await fetch(endpoint);
  const resData = await res.json();

  if (res.ok) {
    return resData;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};
