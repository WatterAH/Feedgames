import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

export const CommentButton = ({ commentData }) => {
  const { id } = commentData;
  return (
    <Link to={`/post/${id}`}>
      <button className="active:scale-125 transition-transform">
        <FontAwesomeIcon icon={faComment} className="h-6 text-cyan-300" />
      </button>
    </Link>
  );
};
