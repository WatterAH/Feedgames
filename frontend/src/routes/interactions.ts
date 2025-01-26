const URL = process.env.NEXT_PUBLIC_SERVER_HOST;

export const interact = async (
  action:
    | {
        type: "liked";
        userId: string;
        postId: string;
        username: string;
        postUser: string;
      }
    | {
        type: "saved";
        userId: string;
        postId: string;
      }
) => {
  const endpoint = `${URL}/interact/${action.type}`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(action),
  });

  const data = await res.json();

  if (data.success != true) {
    throw new Error(data.message);
  }
};

export const uninteract = async (
  type: "liked" | "saved",
  userId: string,
  postId: string
) => {
  const endpoint = `${URL}/unInteract/${type}`;
  const res = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, postId }),
  });

  const data = await res.json();

  if (data.success != true) {
    throw new Error(data.message);
  }
};

export const followUser = async (
  followerId: string,
  followedId: string,
  username: string
) => {
  const endpoint = `${URL}/follow`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ followerId, followedId, username }),
  });

  const data = await res.json();
  if (data.success !== true) {
    throw new Error(data.message);
  }
};

export const unFollowUser = async (followerId: string, followedId: string) => {
  const endpoint = `${URL}/unFollow`;
  const res = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ followerId, followedId }),
  });

  const data = await res.json();
  if (data.success !== true) {
    throw new Error(data.message);
  }
};
