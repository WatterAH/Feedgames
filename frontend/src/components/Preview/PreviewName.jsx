import React from "react";
import { Link } from "react-router-dom";

export const PreviewName = ({ post }) => {
  const { username, user_id } = post;
  return (
    <Link to={`/profile/${user_id}`}>
      <p className="rounded-full bg-gray-800 text-white px-2 py-1 hover:underline hover:cursor-pointer">
        {username}
      </p>
    </Link>
  );
};
