import React from "react";
import { SearchResultHeader } from "./SearchResultHeader";
import { SearchResultDetails } from "./SearchResultDetails";
import { Link } from "react-router-dom";
import { User } from "../../interfaces/User";

export const SearchResult = ({ result }: { result: User }) => {
  return (
    <Link to={`/profile/${result.id}`}>
      <section className="flex flex-col p-1 rounded-md hover:cursor-pointer hover:bg-gray-100 duration-700">
        <SearchResultHeader result={result} />
        <SearchResultDetails result={result} />
      </section>
    </Link>
  );
};
