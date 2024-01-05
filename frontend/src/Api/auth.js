import { URL } from "../App";

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
  console.log(document.cookie);
  if (res.ok) {
    return resData;
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
    return resData;
  } else {
    throw new Error(resData.message);
  }
};

export const checkAuth = async () => {
  const res = await fetch(`${URL}/api/checkAuth`, {
    method: "GET",
    credentials: "include",
  });

  if (res.ok) {
    const user = await res.json();
    return user;
  } else {
    const { message } = await res.json();
    throw new Error(message);
  }
};

export const logoutApi = async () => {
  const res = await fetch(`${URL}/api/logout`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const resData = await res.json();
    const { message } = resData;
    throw new Error(message);
  }
  return;
};
