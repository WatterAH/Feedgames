import { ContentObject, PostInterface } from "@/interfaces/Post";
const URL = process.env.NEXT_PUBLIC_SERVER_HOST;

export const getPosts = async (
  type: "feed" | "user" | "liked" | "saved",
  userId: string,
  page: number,
  limit: number,
  requestId?: string
): Promise<PostInterface[]> => {
  const endpoint = `${URL}/posts/${type}?current_id=${userId}&page=${page}&limit=${limit}&request_id=${requestId}`;

  const res = await fetch(endpoint);
  const data = await res.json();

  if (data.success == true) {
    return data.data;
  } else {
    throw new Error(data.message);
  }
};

export const getPostById = async (
  id: string,
  userId: string
): Promise<{ post: PostInterface; responses: PostInterface[] }> => {
  const endpoint = `${URL}/post/${id}?userId=${userId}`;

  const res = await fetch(endpoint);
  const data = await res.json();

  if (data.success == true) {
    return data.data;
  } else {
    throw new Error(data.message);
  }
};

export const createPost = async (
  userId: string,
  text: string,
  content: ContentObject,
  username: string,
  parentId?: string
): Promise<PostInterface> => {
  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("text", text);
  formData.append("username", username);
  formData.append("content", JSON.stringify(content));
  if (parentId) formData.append("parentId", parentId);
  if (content?.type == "image") formData.append("image", content.data);

  const res = await fetch(`${URL}/posts`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data = await res.json();

  if (data.success == true) {
    return data.data;
  } else {
    throw new Error(data.message);
  }
};

export const editPostById = async (
  id: string,
  post: Partial<PostInterface>
) => {
  const res = await fetch(`${URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(post),
  });

  const data = await res.json();

  if (data.success) {
    return true;
  } else {
    throw new Error(data.message);
  }
};

export const deletePostById = async (id: string): Promise<void> => {
  const res = await fetch(`${URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }
};
