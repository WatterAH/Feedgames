import { URL } from "../App";
import { getToken, setCookie } from "../functions/token";

export const loginApi = async (username, password) => {
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
    const { user, token } = resData;
    setCookie(token);
    return user;
  } else {
    throw new Error(resData.message);
  }
};

export const registerApi = async (name, username, details, password) => {
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
    const { user, token } = resData;
    setCookie(token);
    return user;
  } else {
    throw new Error(resData.message);
  }
};

export const checkAuth = async () => {
  const token = getToken();
  const res = await fetch(`${URL}/api/checkAuth?token=${token}`, {
    method: "GET",
    credentials: "include",
  });
  const resData = await res.json();
  if (res.ok) {
    return resData;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const logoutApi = async () => {
  return (document.cookie = `token=; Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=none`);
};
