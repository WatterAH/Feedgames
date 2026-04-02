import { useCallback, useEffect, useState } from "react";
import { Message } from "@/interfaces/Party";
import messageRouter from "@/routes/message";

export const useParty = (partyId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(false);

  const getMessages = useCallback(async () => {
    if (!partyId || !hasMore) return;

    try {
      if (page == 0) setLoading(true);
      const data = await messageRouter.list(partyId, page, 10);
      if (data.length > 0) {
        setMessages((prev) => [...prev, ...data]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [partyId, hasMore, page]);

  useEffect(() => {
    if (page == 0) getMessages();
  }, [partyId, page, getMessages]);

  return { messages, loading, error, hasMore, getMessages, setMessages };
};
