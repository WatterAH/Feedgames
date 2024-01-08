import React from "react";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const ReplyTo = ({ comment }) => {
  const { id } = comment;
  return (
    <Link to={`/comment/${id}`}>
      <button className="hover:scale-125 transition-transform">
        <FontAwesomeIcon icon={faReply} className="text-gray-500" />
      </button>
    </Link>
  );
};
