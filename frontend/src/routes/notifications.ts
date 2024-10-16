import { Notification } from "../interfaces/Notification";
const URL = process.env.NEXT_PUBLIC_SERVER_HOST;

export const getMyNotifications = async (
  userId: string,
  page: number,
  limit: number
): Promise<Notification[]> => {
  const endpoint = `${URL}/api/getNotifications?id=${encodeURIComponent(
    userId
  )}&page=${page}&limit=${limit}`;
  const res = await fetch(endpoint);
  const resData = await res.json();

  if (res.ok) {
    return resData as Notification[];
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const deleteNotificationById = async (id: string): Promise<void> => {
  const res = await fetch(`${URL}/api/deleteNotification`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    const resData = await res.json();
    const { message } = resData;
    throw new Error(message);
  }
  return;
};

// export const hasNotifications = async (userId: string): Promise<boolean> => {
//   const {
//     data: notifications,
//     error,
//   }: { data: Notification[]; error: PostgrestError } = await supabase
//     .from("notify")
//     .select("read")
//     .eq("id_user", userId);
//   if (error) {
//     throw new Error(error.message);
//   } else {
//     return notifications.some((notification) => notification.read == false);
//   }
// };
