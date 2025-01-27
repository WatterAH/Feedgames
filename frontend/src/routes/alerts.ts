import { Notification } from "../interfaces/Notification";
const URL = process.env.NEXT_PUBLIC_SERVER_HOST;

export const getMyNotifications = async (
  userId: string,
  page: number,
  limit: number
): Promise<Notification[]> => {
  const endpoint = `${URL}/alerts/?id=${encodeURIComponent(
    userId
  )}&page=${page}&limit=${limit}`;

  const res = await fetch(endpoint);
  const data = await res.json();

  if (data.success) {
    return data.data;
  } else {
    throw new Error(data.message);
  }
};

export const deleteNotificationById = async (id: string) => {
  const res = await fetch(`${URL}/alerts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }
};

export const hasAlerts = async (userId: string): Promise<boolean> => {
  const endpoint = `${URL}/hasUnreadAlerts/${userId}`;
  const res = await fetch(endpoint);

  const data = await res.json();

  if (data.success) {
    return data.data;
  } else {
    throw new Error(data.message);
  }
};
