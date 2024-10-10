import { User } from "@/interfaces/User";
const URL = process.env.NEXT_PUBLIC_SERVER_HOST;

export const searchUser = async (searchTerm: string): Promise<User[]> => {
  const res = await fetch(
    `${URL}/api/searchUser?searchTerm=${encodeURIComponent(searchTerm)}`
  );
  const resData = await res.json();

  if (res.ok) {
    return resData as User[];
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const getFollowedById = async (userId: string): Promise<User[]> => {
  const res = await fetch(
    `${URL}/api/getFollowedById?id=${encodeURIComponent(userId)}`
  );
  const resData = await res.json();

  if (res.ok) {
    return resData;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const getFollowersById = async (userId: string): Promise<User[]> => {
  const res = await fetch(
    `${URL}/api/getFollowersById?id=${encodeURIComponent(userId)}`
  );
  const resData = await res.json();

  if (res.ok) {
    return resData;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};
