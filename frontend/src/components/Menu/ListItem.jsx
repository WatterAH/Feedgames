import React from "react";
import { Li } from "./Li";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ListItem = ({ item, currentContent, newNotify }) => {
  return (
    <button
      onClick={item.onClick}
      className={`${
        currentContent == item.content ? "font-bold" : ""
      } relative`}
    >
      <Li>
        {item.content == "Notify" && newNotify ? (
          <div className="rounded-full bg-red-500 h-4 w-4 absolute top-1 left-7"></div>
        ) : null}
        <FontAwesomeIcon
          icon={currentContent == item.content ? item.solid : item.regular}
          className="h-5 lg:h-6"
        />
        <p className="hidden lg:block">{item.text}</p>
      </Li>
    </button>
  );
};
