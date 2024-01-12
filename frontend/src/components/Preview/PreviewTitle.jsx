import React from "react";
import { Link } from "react-router-dom";

export const PreviewTitle = ({ user_id, user }) => {
  const { username } = user;
  return (
    <Link to={`/profile/${user_id}`} className="flex items-center gap-x-2">
      <p className="hover:underline text-gray-400 text-sm font-rubik">
        @{username}
      </p>
    </Link>
  );
};
