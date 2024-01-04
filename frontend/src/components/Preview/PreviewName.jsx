import React from "react";
import { explorerContent } from "../../home/Home";

export const PreviewName = ({ post }) => {
  const { username, user_id } = post;
  return (
    <p
      className="rounded-full bg-gray-800 text-white px-2 py-1 hover:underline hover:cursor-pointer"
      onClick={() => explorerContent("Profile", user_id)}
    >
      {username}
    </p>
  );
};
