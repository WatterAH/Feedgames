import { URL } from "../App";
import { supabase } from "../home/Connection";

export const getMyNotifications = async (userId) => {
  const res = await fetch(
    `${URL}/api/getNotifications?id=${encodeURIComponent(userId)}`
  );
  const resData = await res.json();

  if (res.ok) {
    return resData;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const deleteNotificationById = async (id) => {
  const body = { id };
  const res = await fetch(`${URL}/api/deleteNotification`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const resData = await res.json();

  if (!res.ok) {
    const { message } = resData;
    throw new Error(message);
  }
  return;
};

export const subscribeToNotify = async (handleNewNotification) => {
  supabase
    .channel("custom-insert-channel")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "notify" },
      (payload) => {
        const notification = payload.new;
        handleNewNotification(notification);
      }
    )
    .subscribe();
};

export const hasUnreadNotifications = async (userId) => {
  const { data: notifications, error } = await supabase
    .from("notify")
    .select("read")
    .eq("id_user", userId);
  if (error) {
    throw new Error(error.message);
  } else {
    return notifications.some((notification) => notification.read == false);
  }
};
