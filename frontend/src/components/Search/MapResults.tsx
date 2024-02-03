import React from "react";
import { SearchResult } from "./SearchResult";
import { User } from "../../interfaces/User";

interface Props {
  results: User[];
}

export const MapResults: React.FC<Props> = ({ results }) => {
  return (
    <div className="absolute top-16 left-14 right-8 bg-white shadow-md p-4 rounded-md flex flex-col gap-y-1">
      {results.map((result) => (
        <SearchResult result={result} key={result.id} />
      ))}
    </div>
  );
};
