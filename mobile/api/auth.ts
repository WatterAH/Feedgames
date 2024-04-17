import { URL } from "@/constants/server";
import { User } from "../interfaces/User";
import { ImagePickerAsset } from "expo-image-picker";

export const usernameAvailable = async (username: string) => {
  const body = { username };
  const res = await fetch(`${URL}/api/usernameAvailable`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (res.ok) {
    return true;
  } else {
    const resData = await res.json();
    const { message } = resData;
    throw new Error(message);
  }
};

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
  password: string,
  image?: ImagePickerAsset
): Promise<{ user: User; token: string }> => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("username", username);
  formData.append("details", details);
  formData.append("password", password);
  if (image) {
    //@ts-ignore
    formData.append("image", {
      uri: image.uri,
      name: "image",
      type: image.type,
    });
  }
  const res = await fetch(`${URL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
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
