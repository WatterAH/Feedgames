import { User } from "../interfaces/User";
const URL = process.env.NEXT_PUBLIC_SERVER_HOST;

export const loginApi = async (
  username: string,
  password: string
): Promise<{ user: User; token: string }> => {
  const res = await fetch(`${URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
};

export const registerApi = async (
  name: string,
  username: string,
  details: string,
  password: string
): Promise<{ user: User; token: string }> => {
  const res = await fetch(`${URL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, username, details, password }),
  });
  const resData = await res.json();
  if (res.ok) {
    return resData;
  } else {
    throw new Error(resData.message);
  }
};

export const checkAuth = async (
  userToken: string
): Promise<{ user: User; token: string }> => {
  const res = await fetch(
    `${URL}/api/checkAuth?userToken=${encodeURIComponent(userToken)}`
  );
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    const { message } = data;
    throw new Error(message);
  }
};
