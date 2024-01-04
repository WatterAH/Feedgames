import React from "react";
import { explorerContent } from "../../home/Home";
import { calculateDate } from "../../functions/date";

export const PostHeader = ({ data }) => {
  const { id, user_id, title, username, created_at } = data;
  const date = calculateDate(created_at);

  return (
    <header className="flex flex-col gap-2">
      <span className="flex justify-between">
        <h1
          className="text-2xl font-montserrat hover:underline hover:cursor-pointer"
          onClick={() => explorerContent("Post", id)}
        >
          {title}
        </h1>
      </span>
      <span className="flex justify-between">
        <p className="text-gray-400 text-sm font-rubik">
          <button onClick={() => explorerContent("Profile", user_id)}>
            Por <span className="hover:underline">{username}</span>
          </button>
        </p>
        <p className="text-gray-400 text-xs font-rubik">{date}</p>
      </span>
    </header>
  );
};
