import { URL } from "../App";

export const getFriendsById = async (id) => {
  const res = await fetch(
    `${URL}/api/getFriendsById?id=${encodeURIComponent(id)}`
  );
  const resData = res.json();
  if (res.ok) {
    return resData;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};
