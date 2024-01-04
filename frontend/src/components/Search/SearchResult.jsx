import React from "react";
import { faBook, faUser } from "@fortawesome/free-solid-svg-icons";
import { explorerContent } from "../../home/Home";
import { SearchResultHeader } from "./SearchResultHeader";
import { SearchResultDetails } from "./SearchResultDetails";

export const SearchResult = ({ result }) => {
  const contentString = result.username ? "Profile" : "Post";
  const icon = result.username ? faUser : faBook;
  return (
    <section
      className="flex flex-col p-1 mb-2 rounded-md hover:cursor-pointer hover:bg-gray-100 duration-700"
      onClick={() => explorerContent(contentString, result.id)}
    >
      <SearchResultHeader result={result} icon={icon} />
      <SearchResultDetails result={result} />
    </section>
  );
};
