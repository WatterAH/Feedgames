import React from "react";
import { Li } from "./Li";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const ListItem = ({ link, icon, text, setCurrent, newNotify }) => {
  return (
    <Link to={link} onClick={() => setCurrent(text)}>
      <Li>
        {text == "Notificaciones" && newNotify ? (
          <div className="rounded-full bg-red-500 h-4 w-4 absolute top-1 left-5"></div>
        ) : null}
        <FontAwesomeIcon icon={icon} className="h-5 lg:h-6 text-gray-800" />
        <p className="hidden lg:block">{text}</p>
      </Li>
    </Link>
  );
};
