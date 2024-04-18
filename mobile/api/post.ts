import { URL } from "@/constants/server";
import { PostInterface } from "@/interfaces/Post";

export const fetchPosts = async (
  userId: string,
  page: number,
  limit: number
): Promise<PostInterface[]> => {
  const res = await fetch(
    `${URL}/api/loadPosts?id_user=${userId}&page=${page}&limit=${limit}`
  );
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
