const URL = process.env.NEXT_PUBLIC_SERVER_HOST;

export const likePost = async (
  userId: string,
  postId: string,
  username: string,
  postUser: string
): Promise<void> => {
  const res = await fetch(`${URL}/api/likePost`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ userId, postId, username, postUser }),
  });

  console.log(res);
  if (!res.ok) {
    throw new Error("No se  pudo realizar la acción");
  }
  return;
};

export const unLikePost = async (
  userId: string,
  postId: string
): Promise<void> => {
  const res = await fetch(`${URL}/api/unLikePost`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ userId, postId }),
  });

  if (!res.ok) {
    throw new Error("No se pudo realizar la acción");
  }
  return;
};

export const savePost = async (
  userId: string,
  postId: string
): Promise<void> => {
  const res = await fetch(`${URL}/api/savePost`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ userId, postId }),
  });

  if (!res.ok) {
    throw new Error("No se pudo realizar la acción");
  }
  return;
};

export const unSavePost = async (
  userId: string,
  postId: string
): Promise<void> => {
  const res = await fetch(`${URL}/api/unSavePost`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ userId, postId }),
  });

  if (!res.ok) {
    throw new Error("No se pudo realizar la acción");
  }
  return;
};

export const followUser = async (
  followerId: string,
  followedId: string,
  username: string
): Promise<void> => {
  const res = await fetch(`${URL}/api/followUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ followerId, followedId, username }),
  });

  if (!res.ok) {
    throw new Error("No se pudo realizar la acción");
  }
  return;
};

export const unFollowUser = async (
  followerId: string,
  followedId: string,
  username: string
): Promise<void> => {
  const res = await fetch(`${URL}/api/unFollowUser`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ followerId, followedId, username }),
  });

  if (!res.ok) {
    throw new Error("No se pudo realizar la acción");
  }
  return;
};
