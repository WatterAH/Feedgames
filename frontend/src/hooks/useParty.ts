import { useCallback, useEffect, useState } from "react";
import { Message } from "@/interfaces/Party";
import messageRouter from "@/routes/message";
import { useUser } from "@/context/AuthContext";
import { useSocket } from "@/context/SocketContext";
import { toast } from "sonner";
import { setHasUnread } from "@/store/inboxSlice";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";

export const useParty = (partyId: string) => {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(false);

  const getMessages = useCallback(async () => {
    if (!partyId || !hasMore) return;

    try {
      if (page == 0) setLoading(true);
      const data = await messageRouter.list(partyId, page, 20, user.id);
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

export const subscribeToMessages = () => {
  const { socket } = useSocket();
  const dispatch: AppDispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = () => {
      if (pathname.includes("/party")) return;
      toast("Tienes nuevos mensajes");
      dispatch(setHasUnread(true));
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [socket]);
};
