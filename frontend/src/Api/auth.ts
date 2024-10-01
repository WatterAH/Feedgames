import { User } from "../interfaces/User";
import { RiotAuth } from "../interfaces/Valorant";

export const loginApi = async (
  username: string,
  password: string
): Promise<{ user: User; token: string }> => {
  const res = await fetch(`/api/login`, {
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
  userToken: string,
  riotToken: string
): Promise<{ user: User; riot: RiotAuth }> => {
  const res = await fetch("/api/session", {
    method: "GET",
    headers: { Authorization: userToken },
  });

  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    const { message } = data;
    throw new Error(message);
  }
};

export const logoutApi = async (): Promise<void> => {
  document.cookie = `token=; Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=none`;
  return;
};
