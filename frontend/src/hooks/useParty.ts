import { useCallback, useEffect, useRef, useState } from "react";
import { Message, Party } from "@/interfaces/Party";
import messageRouter from "@/routes/message";
import { useUser } from "@/context/AuthContext";
import { useSocket } from "@/context/SocketContext";
import { toast } from "sonner";
import { addParty, setHasUnread, setLastMessage } from "@/store/inboxSlice";
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

  const pathnameRef = useRef(pathname);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (payload: any) => {
      dispatch(setLastMessage(payload));

      if (pathnameRef.current.includes(`/party/${payload.party_id}`)) return;

      if (pathnameRef.current.includes("/party")) {
        toast("Tienes nuevos mensajes");
        return;
      }

      toast("Tienes nuevos mensajes");
      dispatch(setHasUnread(true));
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    const handleParty = (payload: Party) => dispatch(addParty(payload));

    socket.on("new_party", handleParty);

    return () => {
      socket.off("new_party", handleParty);
    };
  }, [socket]);
};
