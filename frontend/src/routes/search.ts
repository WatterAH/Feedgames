import { PostInterface } from "@/interfaces/Post";
import { User } from "@/interfaces/User";
const URL = process.env.NEXT_PUBLIC_SERVER_HOST;

export const getUsers = async (
  searchTerm: string,
  userId: string
): Promise<User[]> => {
  const res = await fetch(
    `${URL}/search/users?searchTerm=${encodeURIComponent(
      searchTerm
    )}&userId=${userId}`
  );

  const data = await res.json();

  if (data.success == true) {
    return data.data;
  } else {
    throw new Error(data.message);
  }
};

export const getCurrentTerm = async (
  current: string,
  userId: string
): Promise<PostInterface[]> => {
  const res = await fetch(
    `${URL}/search/posts?searchTerm=${encodeURIComponent(
      current
    )}&userId=${encodeURIComponent(userId)}`
  );

  const data = await res.json();

  if (data.success == true) {
    return data.data;
  } else {
    throw new Error(data.message);
  }
};

export const loadTopLikedPosts = async (
  userId: string
): Promise<PostInterface[]> => {
  const res = await fetch(
    `${URL}/search/tendency?userId=${encodeURIComponent(userId)}`
  );
  const data = await res.json();

  if (data.success == true) {
    return data.data;
  } else {
    throw new Error(data.message);
  }
};
