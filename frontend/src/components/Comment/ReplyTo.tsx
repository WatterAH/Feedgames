import React from "react";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { CommentInterface } from "../../interfaces/Comment";

export const ReplyTo = ({ comment }: { comment: CommentInterface }) => {
  const { id, responses } = comment;
  return (
    <Link to={`/comment/${id}`} className="flex items-center gap-x-1">
      <FontAwesomeIcon
        icon={faReply}
        className="text-gray-500 h-4 hover:scale-125 transition-transform"
      />
      <p className="text-gray-500 text-xs hover:underline">
        {responses.length}
      </p>
    </Link>
  );
};
