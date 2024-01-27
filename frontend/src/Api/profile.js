import { URL } from "../App";
import { setCookie } from "../functions/token";

export const getProfile = async (id, myID) => {
  const res = await fetch(
    `${URL}/api/getProfile?id=${encodeURIComponent(
      id
    )}&myID=${encodeURIComponent(myID)}`
  );
  const resData = await res.json();
  if (res.ok) {
    return resData;
  } else if (res.status == 404) {
    return null;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const getProfilePost = async (id, myID) => {
  const res = await fetch(
    `${URL}/api/getProfilePosts?id=${encodeURIComponent(
      id
    )}&myID=${encodeURIComponent(myID)}`
  );
  const resData = await res.json();
  if (res.ok) {
    return resData;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const editProfile = async (id, name, username, details, image) => {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("name", name);
  formData.append("username", username);
  formData.append("details", details);
  formData.append("image", image);

  const res = await fetch(`${URL}/api/editProfileById`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });
  const resData = await res.json();
  if (res.ok) {
    const { user, token } = resData;
    setCookie(token);
    return user;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};
