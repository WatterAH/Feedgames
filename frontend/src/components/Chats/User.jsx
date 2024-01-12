import React from "react";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const User = ({ user, setOpen }) => {
  const { id, name, username } = user;
  return (
    <Link
      to={"/direct/2"}
      onClick={() => setOpen(false)}
      className="px-4 py-3 border-b flex items-center gap-x-4"
    >
      <section className="rounded-full h-10 w-10 p-3 flex items-center justify-center bg-gray-200">
        <FontAwesomeIcon icon={faUser} className="h-full text-cyan-400" />
      </section>
      <section className="flex flex-col">
        <p className="text-lg text-gray-950">{name}</p>
        <p className="text-gray-500 text-sm -mt-1">@{username}</p>
      </section>
    </Link>
  );
};
