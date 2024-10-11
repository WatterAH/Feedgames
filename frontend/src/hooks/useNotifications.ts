import { getMyNotifications } from "@/routes/notifications";
import { Notification } from "@/interfaces/Notification";
import { useCallback, useEffect, useState } from "react";

export const useNotifications = (userId: string | undefined) => {
  const [page, setPage] = useState(0);
  const [notify, setNotify] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getNotifications = useCallback(async () => {
    if (!userId || !hasMore) return;
    try {
      if (page == 0) setLoading(true);
      const data = await getMyNotifications(userId, page, 10);
      if (data.length > 0) {
        setNotify((prevNotify) => [...prevNotify, ...data]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error: any) {
      setError(true);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  }, [userId, page, hasMore]);

  useEffect(() => {
    if (page == 0) getNotifications();
  }, [userId, page, getNotifications]);

  return {
    notify,
    loading,
    error,
    hasMore,
    getNotifications,
    setNotify,
  };
};
