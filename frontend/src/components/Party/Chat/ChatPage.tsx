"use client";

import React, { useEffect } from "react";
import Title from "../../Layout/Title";
import { Party } from "@/interfaces/Party";
import Card from "../../Layout/Card";
import Input from "./MessageComposer";
import MessageList from "./MessageList";
import { useSocket } from "@/context/SocketContext";
import ChatHeader from "./ChatHeader";
import { useUser } from "@/context/AuthContext";

interface Props extends Party {
  error?: boolean;
}

const ChatPage: React.FC<Props> = ({ error, ...data }) => {
  const { id } = data;
  const { user } = useUser();
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.emit("join_party", { userId: user.id, partyId: id });

    return () => {
      socket.emit("leave_party", { userId: user.id, partyId: id });
    };
  }, [socket]);

  return (
    <>
      <Title title="Party Chat" />
      <Card />
      <div className="flex flex-col h-screen md:h-[90dvh] w-full max-w-2xl pt-20 pb-14 md:pt-3 md:mt-[11dvh] lg:pb-0 z-10 fixed bottom-0 md:bottom-auto">
        <ChatHeader {...data} />
        <div
          id="messages-list"
          className="flex-1 flex flex-col-reverse my-4 overflow-y-auto w-full"
        >
          <MessageList {...data} />
        </div>
        <Input {...data} />
      </div>
    </>
  );
};

export default ChatPage;
