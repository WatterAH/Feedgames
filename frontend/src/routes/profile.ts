import { User } from "../interfaces/User";
const URL = process.env.NEXT_PUBLIC_SERVER_HOST;

export const getProfile = async (
  userId: string,
  requestId: string
): Promise<User | null> => {
  const endpoint = `${URL}/users/${userId}?requestId=${requestId}`;
  const res = await fetch(endpoint);
  const resData = await res.json();

  if (resData.success) {
    return resData.data;
  } else if (res.status == 404) {
    return null;
  } else {
    throw new Error(resData.message);
  }
};

export const editProfile = async (
  userId: string,
  user: Partial<User>,
  image: File | null
): Promise<User | null> => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(user));
  if (image) formData.append("image", image);

  const endpoint = `${URL}/users/${userId}`;
  const res = await fetch(endpoint, {
    method: "PUT",
    body: formData,
  });

  const data = await res.json();

  if (data.success) {
    return data.data;
  } else {
    throw new Error(data.message);
  }
};

export const createProfile = async (user: Partial<User>) => {
  const endpoint = `${URL}/users`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await res.json();
  if (data.success) {
    return data.data;
  } else {
    throw new Error(data.message);
  }
};

export const auth = async (
  username: string,
  password: string
): Promise<{ user: User; token: string }> => {
  const res = await fetch(`${URL}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();

  if (data.success) {
    return data.data;
  } else {
    throw new Error(data.message);
  }
};

export const checkAuth = async (
  userToken: string
): Promise<{ user: User; token: string }> => {
  const endpoint = `${URL}/checkToken/${userToken}`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  if (data.success) {
    return data.data;
  } else {
    throw new Error(data.message);
  }
};
