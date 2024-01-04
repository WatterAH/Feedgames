import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SearchResultHeader = ({ result, icon }) => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-x-3">
        <h4 className="font-montserrat text-lg">
          {result.username || result.title}
        </h4>
        <h6 className="font-montserrat text-xs text-gray-500">
          {result.name || ""}
        </h6>
      </div>
      <FontAwesomeIcon icon={icon} className="h-5 text-gray-500" />
    </header>
  );
};
