import { URL } from "../App";
import { PostInterface } from "../interfaces/Post";
import { User } from "../interfaces/User";

export const getMySaved = async (userId: string): Promise<PostInterface[]> => {
  const res = await fetch(
    `${URL}/api/loadSaved?id=${encodeURIComponent(userId)}`
  );
  const resData = await res.json();

  if (res.ok) {
    return resData;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const getMyLiked = async (userId: string): Promise<PostInterface[]> => {
  const res = await fetch(
    `${URL}/api/loadLiked?id=${encodeURIComponent(userId)}`
  );
  const resData = await res.json();

  if (res.ok) {
    return resData;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

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
