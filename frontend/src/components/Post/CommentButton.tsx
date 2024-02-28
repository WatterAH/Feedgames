import React from "react";
import { Link } from "react-router-dom";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";

interface Props {
  id: string;
}

export const CommentButton = ({ commentData }: { commentData: Props }) => {
  const { id } = commentData;
  return (
    <Link to={`/p/${id}`}>
      <button className="active:scale-125 transition-transform">
        <ChatBubbleLeftEllipsisIcon
          aria-hidden="true"
          className="h-6 text-cyan-400"
        />
      </button>
    </Link>
  );
};
