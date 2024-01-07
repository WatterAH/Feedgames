import { URL } from "../App";

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

export const editProfile = async (id, name, username, oldUsername, details) => {
  const changedUsername = oldUsername === username ? false : true;
  const body = { id, name, username, details, changedUsername };
  const res = await fetch(`${URL}/api/editProfileById`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const resData = await res.json();
  if (res.ok) {
    const { user, token } = resData;
    document.cookie = `token=${token}; expires=${30 * 24 * 60 * 1000}; secure;`;
    return user;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};
