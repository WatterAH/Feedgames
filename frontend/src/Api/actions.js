import { URL } from "../App";

export const getMySaved = async (userId) => {
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
