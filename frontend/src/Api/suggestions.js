import { URL } from "../App";

export const getTendencyPost = async () => {
  const res = await fetch(`${URL}/api/loadSuggestions`);
  const resData = await res.json();

  if (res.ok) {
    return resData;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};
