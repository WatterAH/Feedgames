import { getMyNotifications } from "@/api/notifications";
import { Notification } from "@/interfaces/Notification";
import { useCallback, useEffect, useState } from "react";

export const useNotifications = (userId: string | undefined) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loadingPage, setLoadingPage] = useState(false);

  const getNotifications = useCallback(async () => {
    if (!userId) return;
    try {
      const data = await getMyNotifications(userId);
      setNotifications(data);
    } catch (error) {}
  }, [userId]);

  useEffect(() => {
    setLoadingPage(true);
    getNotifications().then(() => setLoadingPage(false));
  }, [userId]);

  return {
    notifications,
    loadingPage,
    getNotifications,
  };
};
