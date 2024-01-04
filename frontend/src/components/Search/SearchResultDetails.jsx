import React from "react";

export const SearchResultDetails = ({ result }) => {
  return (
    <p className="font-montserrat text-sm text-gray-600 mt-2">
      {result.details || result.content.slice(0, 46) + "..."}
    </p>
  );
};
