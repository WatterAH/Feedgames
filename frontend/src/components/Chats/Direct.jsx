import React, { useEffect, useState } from "react";
import { Input } from "./Input";
import { MessageList } from "./MessageList";
import { useUser } from "../../context/AuthContext";
import { socket } from "../../home/Home";
import { useParams } from "react-router-dom";

export const Direct = () => {
  const { user } = useUser();
  const { id: r } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.length == 0) {
      return;
    }
    const data = {
      user,
      r,
      message: message.trim(),
    };
    socket.emit("message", data);
    return setMessage("");
  };

  useEffect(() => {
    socket.emit("join_room", r);
    return () => {
      socket.off("join_room");
    };
  }, []);

  useEffect(() => {
    const handleMessage = (message) => {
      setMessages((state) => [...state, message]);
    };
    socket.on("message", handleMessage);
    return () => {
      socket.off("message", handleMessage);
    };
  });

  return (
    <div className="lg:ml-64 w-full h-screen border flex flex-col">
      <MessageList messages={messages} />
      <form onSubmit={handleSubmit}>
        <div className="px-3 pb-5 max-w-2xl mx-auto">
          <Input
            value={message}
            type="text"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};
