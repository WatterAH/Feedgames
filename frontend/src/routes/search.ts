import { PostInterface } from "@/interfaces/Post";
import { User } from "@/interfaces/User";
const URL = process.env.NEXT_PUBLIC_SERVER_HOST;

export const getUsers = async (
  searchTerm: string,
  userId: string
): Promise<User[]> => {
  const res = await fetch(
    `${URL}/api/getUsersBySearchTerm?searchterm=${encodeURIComponent(
      searchTerm
    )}&userId=${userId}`
  );

  const resData = await res.json();

  if (res.ok) {
    const { users } = resData;
    return users;
  } else {
    throw new Error(resData.message);
  }
};

export const getCurrentTerm = async (
  current: string,
  userId: string
): Promise<PostInterface[]> => {
  const res = await fetch(
    `${URL}/api/getCurrentTerm?term=${encodeURIComponent(
      current
    )}&userId=${encodeURIComponent(userId)}`
  );

  const resData = await res.json();

  if (res.ok) {
    const { posts } = resData;
    return posts;
  } else {
    throw new Error(resData.message);
  }
};
