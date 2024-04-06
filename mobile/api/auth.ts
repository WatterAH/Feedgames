import { URL } from "@/constants/server.constant";
import { User } from "../interfaces/User";

export const loginApi = async (
  username: string,
  password: string
): Promise<{ user: User; token: string }> => {
  const body = { username, password };
  const res = await fetch(`${URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const resData = await res.json();
  if (res.ok) {
    return resData;
  } else {
    throw new Error(resData.message);
  }
};

export const registerApi = async (
  name: string,
  username: string,
  details: string,
  password: string
): Promise<{ user: User; token: string }> => {
  const body = { name, username, details, password };
  const res = await fetch(`${URL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
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
): Promise<{ user: User; userToken: string }> => {
  const ENDPOINT = `${URL}/api/checkAuth?userToken=${encodeURIComponent(
    userToken
  )}&riotToken=""`;
  const res = await fetch(ENDPOINT);
  const resData = await res.json();
  if (res.ok) {
    return resData;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};
