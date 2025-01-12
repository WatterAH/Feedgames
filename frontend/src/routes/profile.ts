import { Theme } from "@/constants/themes";
import { User } from "../interfaces/User";
const URL = process.env.NEXT_PUBLIC_SERVER_HOST;

export const getProfile = async (
  userId: string,
  requestId: string
): Promise<User | null> => {
  const res = await fetch(
    `${URL}/api/getProfile?userId=${encodeURIComponent(
      userId
    )}&requestId=${encodeURIComponent(requestId)}`
  );
  const resData = await res.json();
  if (res.ok) {
    return resData as User;
  } else if (res.status == 404) {
    return null;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const editProfile = async (
  id: string,
  name: string,
  username: string,
  details: string,
  image: File | null
): Promise<{ user: User; token: string }> => {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("name", name);
  formData.append("username", username);
  formData.append("details", details);
  if (image) {
    formData.append("image", image);
  }

  const res = await fetch(`${URL}/api/editProfile`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });
  const resData = await res.json();
  if (res.ok) {
    return resData;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const changeTheme = async (userId: string, theme: Theme) => {
  const res = await fetch(`${URL}/api/changeTheme`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, theme }),
  });

  const resData = await res.json();
  if (!res.ok) {
    const { message } = resData;
    throw new Error(message);
  }

  return;
};
