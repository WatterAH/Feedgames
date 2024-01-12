import React from "react";
import { Message } from "./Message";

export const MessageList = () => {
  return (
    <div className="w-full h-4/5 overflow-y-auto">
      <ul className="w-full">
        <Message />
      </ul>
    </div>
  );
};
