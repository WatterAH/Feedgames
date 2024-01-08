import React from "react";
import { Link } from "react-router-dom";

export const Commentator = ({ comment }) => {
  const { username, id_user } = comment;
  return (
    <Link to={`/profile/${id_user}`}>
      <p className="absolute -top-2 -left-2 text-white w-fit px-2 py-1 text-sm font-semibold mb-1 rounded-full bg-gray-800 hover:underline hover:cursor-pointer">
        {username}:
      </p>
    </Link>
  );
};
