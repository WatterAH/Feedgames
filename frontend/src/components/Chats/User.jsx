import React from "react";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import default_pfp from "../../assets/img/default.png";

export const User = ({ user, setOpen }) => {
  const { id, name, username, pfp } = user;
  const src = pfp
    ? `https://zptrwdrgobouoriwsfoj.supabase.co/storage/v1/object/public/Images/pfp/${pfp}`
    : default_pfp;
  return (
    <Link
      to={"/direct/2"}
      onClick={() => setOpen(false)}
      className="px-4 py-3 border-b flex items-center gap-x-4"
    >
      <img src={src} alt={name} className="rounded-full h-10 w-10" />
      <section className="flex flex-col">
        <p className="font-montserrat text-gray-950">{name}</p>
        <p className="text-gray-500 text-sm font-montserrat -mt-1">
          @{username}
        </p>
      </section>
    </Link>
  );
};
