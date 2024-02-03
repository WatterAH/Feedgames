import React from "react";
import { Li } from "./Li";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
  link: string;
  icon: IconProp;
  text: string;
}

export const ListItem: React.FC<Props> = ({ link, icon, text }) => {
  return (
    <Link to={link}>
      <Li>
        <FontAwesomeIcon icon={icon} className="h-5 lg:h-6 text-gray-800" />
        <p className="hidden lg:block">{text}</p>
      </Li>
    </Link>
  );
};
