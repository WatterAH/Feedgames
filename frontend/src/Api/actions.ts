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

export const searchFor = async (searchTerm: string): Promise<User[]> => {
  const res = await fetch(
    `${URL}/api/searchTerm?searchTerm=${encodeURIComponent(searchTerm)}`
  );
  const resData = await res.json();

  if (res.ok) {
    return resData as User[];
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const reportById = async (
  id: string,
  type: string,
  reason: string
): Promise<void> => {
  const body = { id, type, reason };
  const res = await fetch(`${URL}/api/reportById`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const resData = await res.json();
    const { message } = resData;
    throw new Error(message);
  }
  return;
};
