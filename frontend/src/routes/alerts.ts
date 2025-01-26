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

export const deleteNotificationById = async (id: string): Promise<void> => {
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
