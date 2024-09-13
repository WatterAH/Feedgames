import { URL } from "../App";
import { PostInterface } from "../interfaces/Post";
import { User } from "../interfaces/User";

export const getProfile = async (
  id: string,
  myID: string
): Promise<User | null> => {
  const res = await fetch(
    `${URL}/api/getProfile?id=${encodeURIComponent(
      id
    )}&myID=${encodeURIComponent(myID)}`
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

export const getProfilePost = async (
  id: string,
  myID: string
): Promise<PostInterface[]> => {
  const res = await fetch(
    `${URL}/api/getProfilePosts?id=${encodeURIComponent(
      id
    )}&myID=${encodeURIComponent(myID)}`
  );
  const resData = await res.json();
  if (res.ok) {
    return resData as PostInterface[];
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

  const res = await fetch(`${URL}/api/editProfileById`, {
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
