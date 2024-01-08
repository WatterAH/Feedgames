import React from "react";
import { faBook, faUser } from "@fortawesome/free-solid-svg-icons";
import { SearchResultHeader } from "./SearchResultHeader";
import { SearchResultDetails } from "./SearchResultDetails";
import { Link } from "react-router-dom";

export const SearchResult = ({ result }) => {
  const contentString = result.username ? "profile" : "post";
  const icon = result.username ? faUser : faBook;
  return (
    <Link to={`/${contentString}/${result.id}`}>
      <section className="flex flex-col p-1 mb-2 rounded-md hover:cursor-pointer hover:bg-gray-100 duration-700">
        <SearchResultHeader result={result} icon={icon} />
        <SearchResultDetails result={result} />
      </section>
    </Link>
  );
};
