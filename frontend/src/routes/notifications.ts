import { Notification } from "../interfaces/Notification";
const URL = process.env.NEXT_PUBLIC_SERVER_HOST;

export const getMyNotifications = async (
  userId: string
): Promise<Notification[]> => {
  const res = await fetch(
    `${URL}/api/getNotifications?id=${encodeURIComponent(userId)}`
  );
  const resData = await res.json();

  if (res.ok) {
    return resData as Notification[];
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const deleteNotificationById = async (id: string): Promise<void> => {
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

// export const subscribeToNotify = async (
//   handleNewNotification: (payload: Notification) => void
// ) => {
//   supabase
//     .channel("custom-insert-channel")
//     .on(
//       "postgres_changes",
//       { event: "INSERT", schema: "public", table: "notify" },
//       (payload: any) => {
//         const notification = payload.new;
//         handleNewNotification(notification);
//       }
//     )
//     .subscribe();
// };

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
