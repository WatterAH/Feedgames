import React, { useState } from "react";
import { Input } from "./Input";
import { MessageList } from "./MessageList";
import { useUser } from "../../context/AuthContext";
import { socket } from "../../home/Home";

export const Direct = () => {
  const { user } = useUser();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.length == 0) {
      return;
    }
    const data = {
      message: message.trim(),
      user,
      room: 2,
    };
    socket.emit("message", data);
  };

  return (
    <div className="lg:ml-64 p-3 w-full h-screen border flex flex-col">
      <MessageList />
      <form onSubmit={handleSubmit}>
        <Input value={message} onChange={(e) => setMessage(e.target.value)} />
      </form>
    </div>
  );
};
