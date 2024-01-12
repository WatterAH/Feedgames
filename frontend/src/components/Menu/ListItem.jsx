import React from "react";
import { Li } from "./Li";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const ListItem = ({ link, icon, text }) => {
  return (
    <Link to={link}>
      <Li>
        <FontAwesomeIcon icon={icon} className="h-5 lg:h-6 text-gray-800" />
        <p className="hidden lg:block">{text}</p>
      </Li>
    </Link>
  );
};
