import React from "react";
import { Link } from "react-router-dom";
import { CommentInterface } from "../../interfaces/Comment";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

export const ReplyTo = ({ comment }: { comment: CommentInterface }) => {
  const { id, responses } = comment;
  return (
    <Link to={`/c/${id}`} className="flex items-center gap-x-1">
      <ArrowUturnLeftIcon
        aria-hidden="true"
        className="text-gray-500 h-4 active:scale-125 transition-transform"
      />
      <p className="text-gray-500 text-xs hover:underline">
        {responses.length}
      </p>
    </Link>
  );
};
