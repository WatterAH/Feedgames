import { getMyNotifications } from "@/routes/notifications";
import { Notification } from "@/interfaces/Notification";
import { useCallback, useEffect, useState } from "react";

export const useNotifications = (userId: string | undefined) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getNotifications = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const data = await getMyNotifications(userId);
      setNotifications(data);
    } catch (error: any) {
      setError(false);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    getNotifications();
  }, [userId, getNotifications]);

  return {
    notifications,
    loading,
    error,
  };
};
