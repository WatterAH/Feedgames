import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { explorerContent } from "../../home/Home";

export const CommentButton = ({ commentData }) => {
  const { id } = commentData;
  return (
    <button
      className="active:scale-125 transition-transform"
      onClick={() => explorerContent("Post", id)}
    >
      <FontAwesomeIcon icon={faComment} className="h-6 text-cyan-300" />
    </button>
  );
};
