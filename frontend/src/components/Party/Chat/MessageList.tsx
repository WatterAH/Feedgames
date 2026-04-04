import React, { useEffect, useMemo } from "react";
import Message from "./Message";
import InfiniteScroll from "react-infinite-scroll-component";
import { Message as MessageInterface, Party } from "@/interfaces/Party";
import { useParty } from "@/hooks/useParty";
import { useSocket } from "@/context/SocketContext";
import { useUser } from "@/context/AuthContext";
import messageRouter from "@/routes/message";

interface Props extends Party {
  hookParty: ReturnType<typeof useParty>;
}

const MessageList: React.FC<Props> = ({ hookParty, ...party }) => {
  const { user } = useUser();
  const { socket } = useSocket();
  const { messages, getMessages, hasMore, setMessages } = hookParty;

  const sorted = useMemo(() => {
    return messages.map((msg, i) => {
      const prev = messages[i - 1];

      const GROUPING_THRESHOLD_MS = 60 * 60 * 1000;

      const isFirst =
        !prev ||
        prev.user.id !== msg.user.id ||
        Math.abs(
          new Date(msg.created_at).getTime() -
            new Date(prev.created_at).getTime(),
        ) > GROUPING_THRESHOLD_MS;

      return { ...msg, isFirst };
    });
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (message: MessageInterface) => {
      if (user.id === message.user_id) return;
      setMessages((prev) => [message, ...prev]);
      messageRouter.markAsRead(party.id, user.id);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket, setMessages]);

  return (
    <InfiniteScroll
      className="flex flex-col-reverse mb-16"
      scrollableTarget="messages-list"
      inverse={true}
      dataLength={messages.length}
      hasMore={hasMore}
      next={getMessages}
      loader={<div />}
    >
      {sorted.map((message, i) => (
        <Message key={i} {...message} />
      ))}
    </InfiniteScroll>
  );
};

export default MessageList;
