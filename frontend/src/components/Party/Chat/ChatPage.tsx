"use client";

import React, { useEffect, useState } from "react";
import Title from "../../Layout/Title";
import { Party } from "@/interfaces/Party";
import Card from "../../Layout/Card";
import MessageComposer from "./MessageComposer";
import MessageList from "./MessageList";
import { useSocket } from "@/context/SocketContext";
import ChatHeader from "./ChatHeader";
import { useUser } from "@/context/AuthContext";
import { useParty } from "@/hooks/useParty";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { markAsRead } from "@/store/inboxSlice";
import Error from "@/components/Layout/Error";
import WarningOverlay from "../WarningOverlay";

interface Props extends Party {
  error?: boolean;
}

const ChatPage: React.FC<Props> = ({ error, ...data }) => {
  const { id } = data;
  const { user } = useUser();
  const { socket } = useSocket();
  const party = useParty(id);
  const dispatch: AppDispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!socket) return;

    socket.emit("join_party", { userId: user.id, partyId: id });

    return () => {
      socket.emit("leave_party", { userId: user.id, partyId: id });
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    const handleSentinelAlert = (data: {
      summary: string;
      ux_recommendation: string;
      targetId: string;
    }) => {
      if (data.targetId == user.id) return;

      if (["HARD_BLOCK", "WARNING_OVERLAY"].includes(data.ux_recommendation)) {
        setMessage(data.summary);
        setOpen(true);
      }
    };

    socket.on("sentinel-alert", handleSentinelAlert);

    return () => {
      socket.off("sentinel-alert", handleSentinelAlert);
    };
  }, [socket]);

  useEffect(() => {
    dispatch(markAsRead(id));
  }, [data]);

  return (
    <>
      <Title title="Party Chat" />
      <Card />
      <div className="flex flex-col mx-auto inset-x-0 h-dvh md:h-[90dvh] w-full max-w-2xl pt-20 pb-14 md:pt-3 md:mt-[11dvh] lg:pb-0 z-10 fixed bottom-0 md:bottom-auto">
        {error ? (
          <Error />
        ) : (
          <>
            <ChatHeader {...data} />

            <div
              id="messages-list"
              className="flex-1 flex flex-col-reverse overflow-y-auto w-full md:px-4 mt-2"
            >
              <MessageList hookParty={party} {...data} />
            </div>

            <div className="w-full p-2">
              <MessageComposer hookParty={party} {...data} />
            </div>
          </>
        )}
      </div>

      <WarningOverlay open={open} setOpen={setOpen} message={message} />
    </>
  );
};

export default ChatPage;
