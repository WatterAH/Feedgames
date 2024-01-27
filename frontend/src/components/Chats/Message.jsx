import React from "react";
import default_pfp from "../../assets/img/default.png";
import { useUser } from "../../context/AuthContext";

export const Message = ({ message }) => {
  const { user } = useUser();
  const { user: userMessage, message: text } = message;
  const { pfp, username, name, id } = userMessage;
  const src = pfp
    ? `https://zptrwdrgobouoriwsfoj.supabase.co/storage/v1/object/public/Images/pfp/${pfp}`
    : default_pfp;

  return (
    <div
      className={`flex items-end relative gap-x-1 ${
        id == user.id ? "ml-auto" : ""
      }`}
    >
      <img src={src} alt="pfp" className="rounded-full w-7 h-7" />
      <span className="flex flex-col gap-y-1">
        <p className="text-gray-400 text-xs ml-1">{username}</p>
        <li
          className={`px-3 py-2 table text-sm w-fit rounded-full bg-orange-200`}
        >
          {text}
        </li>
      </span>
    </div>
  );
};
