import React from "react";
import { Message } from "./Message";

export const MessageList = ({ messages }) => {
  return (
    <div className="w-full h-4/5 lg:h-full overflow-y-auto">
      <div className="flex flex-col gap-y-2">
        <header className="h-8 p-3 bg-gray-50"></header>
        <p className="font-montserrat text-center text-gray-500 text-xs">
          Este es el comienzo del chat global.
        </p>
      </div>
      <ul className="w-full flex flex-col gap-y-2 p-3">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </ul>
    </div>
  );
};
