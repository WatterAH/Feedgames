import React from "react";
import { Link } from "react-router-dom";

export const PostCreator = ({ user_id, username }) => {
  return (
    <Link to={`/profile/${user_id}`}>
      <p className="hover:underline text-gray-400 text-sm font-rubik">
        @{username}
      </p>
    </Link>
  );
};
