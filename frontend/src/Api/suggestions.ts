import { URL } from "../App";
import { PostInterface } from "../interfaces/Post";

export const getTendencyPost = async (): Promise<PostInterface[]> => {
  const res = await fetch(`${URL}/api/loadSuggestions`);
  const resData = await res.json();

  if (res.ok) {
    return resData as PostInterface[];
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};
