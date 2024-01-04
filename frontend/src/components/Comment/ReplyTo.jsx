import React from "react";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { explorerContent } from "../../home/Home";

export const ReplyTo = ({ comment }) => {
  const { id } = comment;
  return (
    <button
      className="hover:scale-125 transition-transform"
      onClick={() => explorerContent("Comment", id)}
    >
      <FontAwesomeIcon icon={faReply} className="text-gray-500" />
    </button>
  );
};
