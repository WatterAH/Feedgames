import React, { useEffect, useMemo } from "react";
import Message from "./Message";
import InfiniteScroll from "react-infinite-scroll-component";
import { Message as MessageInterface, Party } from "@/interfaces/Party";
import { useParty } from "@/hooks/useParty";
import { useSocket } from "@/context/SocketContext";

interface Props extends Party {}

const MessageList: React.FC<Props> = (party) => {
  const { id } = party;
  const { socket } = useSocket();
  const { messages, getMessages, hasMore, setMessages } = useParty(id);

  const sorted = useMemo(() => {
    return messages.map((msg, i) => {
      const prev = messages[i - 1];

      const isFirst = !prev || prev.user.id !== msg.user.id;
      const isLast =
        !messages[i + 1] || messages[i + 1].user.id !== msg.user.id;

      return { ...msg, isFirst, isLast };
    });
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (message: MessageInterface) => {
      setMessages((prev) => [message, ...prev]);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket, setMessages]);

  return (
    <InfiniteScroll
      className="flex flex-col-reverse"
      scrollableTarget="messages-list"
      inverse={true}
      dataLength={messages.length}
      hasMore={hasMore}
      next={getMessages}
      loader={<div>Cargando...</div>}
    >
      {sorted.map((message) => (
        <Message key={message.id} {...message} />
      ))}
    </InfiniteScroll>
  );
};

export default MessageList;
