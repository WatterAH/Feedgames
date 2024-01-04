import React from "react";
import { explorerContent } from "../../home/Home";

export const Commentator = ({ comment }) => {
  const { username, id_user } = comment;
  return (
    <p
      className="absolute -top-2 -left-2 text-white w-fit px-2 py-1 text-sm font-semibold mb-1 rounded-full bg-cyan-700 hover:underline hover:cursor-pointer"
      onClick={() => explorerContent("Profile", id_user)}
    >
      {username}:
    </p>
  );
};
