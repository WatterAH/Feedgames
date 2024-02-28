import React from "react";
import { Li } from "./Li";
import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/outline";

interface Props {
  link: string;
  Icon: typeof UserIcon;
  text: string;
}

export const ListItem: React.FC<Props> = ({ link, Icon, text }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Link to={link} onClick={scrollToTop}>
      <Li>
        <Icon
          className="h-5 w-5 lg:h-7 lg:w-7 text-gray-800"
          aria-hidden={true}
        />
        <p className="hidden lg:block">{text}</p>
      </Li>
    </Link>
  );
};
