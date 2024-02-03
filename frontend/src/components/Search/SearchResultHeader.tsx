import React from "react";
import { User } from "../../interfaces/User";
import default_pfp from "../../assets/img/default.png";

export const SearchResultHeader = ({ result }: { result: User }) => {
  const { username, name, pfp } = result;
  const src = pfp
    ? `https://zptrwdrgobouoriwsfoj.supabase.co/storage/v1/object/public/Images/pfp/${pfp}`
    : default_pfp;

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-x-3">
        <h4 className="font-montserrat text-lg">{username}</h4>
        <h6 className="font-montserrat text-xs text-gray-500">{name}</h6>
      </div>
      <img
        src={src}
        alt="pfp"
        className="rounded-full w-9 h-9 flex items-center justify-center"
      />
    </header>
  );
};
