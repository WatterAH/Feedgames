import { PostInterface } from "@/interfaces/Post";
import { User } from "@/interfaces/User";
const URL = process.env.NEXT_PUBLIC_SERVER_HOST;

export const getTendencyPost = async (
  userId: string
): Promise<PostInterface[]> => {
  const res = await fetch(
    `${URL}/api/loadSuggestions?id_user=${encodeURIComponent(userId)}`
  );
  const resData = await res.json();

  if (res.ok) {
    return resData as PostInterface[];
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const getPopularUsers = async (): Promise<User[]> => {
  const res = await fetch(`${URL}/api/loadPopularUsers`);
  const resData = await res.json();

  if (res.ok) {
    return resData;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};
