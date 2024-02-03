import React from "react";
import { User } from "../../interfaces/User";

export const SearchResultDetails = ({ result }: { result: User }) => {
  return (
    <p className="font-montserrat text-sm text-gray-600 mt-2">
      {result.details}
    </p>
  );
};
