import React from "react";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const ReplyTo = ({ comment }) => {
  const { id, responses } = comment;
  return (
    <Link to={`/comment/${id}`} className="flex items-center gap-x-1">
      <FontAwesomeIcon
        icon={faReply}
        className="text-gray-500 h-3 hover:scale-125 transition-transform"
      />
      <p className="text-gray-500 text-xs hover:underline">
        {responses.length}
      </p>
    </Link>
  );
};
