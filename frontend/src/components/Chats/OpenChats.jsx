import React from "react";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const OpenChats = ({ setOpen }) => {
  return (
    <button
      className="active:scale-125 transition-transform"
      onClick={() => setOpen((prev) => !prev)}
    >
      <FontAwesomeIcon icon={faUsers} className="h-6 text-indigo-300" />
    </button>
  );
};
