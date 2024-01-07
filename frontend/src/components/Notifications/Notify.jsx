import {
  faComments,
  faHeart,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Options } from "./Options";
import { explorerContent } from "../../home/Home";

export const Notify = ({ notify, setOpen, setNotifications }) => {
  const { id, id_linked, content, text, type } = notify;
  const icon = (int) => {
    const icons = [faHeart, faComments, faUserGroup];
    return icons[int];
  };
  const handleClick = () => {
    setOpen(false);
    explorerContent(content, id_linked);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center gap-3 bg-blue-200 hover:bg-blue-100 duration-700 cursor-pointer py-4 px-2 rounded-md shadow-md"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={icon(type)} className="h-6 text-blue-500" />
        <p className="font-montserrat text-xs md:text-base text-gray-800">
          {text}
        </p>
      </div>
      <section className="ml-auto absolute bottom-4 right-2">
        <Options optionsData={{ id }} setNotifications={setNotifications} />
      </section>
    </div>
  );
};
