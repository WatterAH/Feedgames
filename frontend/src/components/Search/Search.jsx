import React, { useState } from "react";
import { URL } from "../../App";
import { Input } from "../Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { SearchResult } from "./SearchResult";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState({ user: [], post: [] });
  const handleSearch = async (e) => {
    try {
      setSearchTerm(e.target.value);
      const res = await fetch(
        `${URL}/api/searchTerm?searchTerm=${encodeURIComponent(searchTerm)}`
      );
      const resData = await res.json();
      if (!res.ok) {
        toast.error(resData.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        setResults(resData);
      }
    } catch (error) {
      toast.error("Ocurrio un error", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const combinedResults = searchTerm ? [...results.user, ...results.post] : [];

  return (
    <div className="relative">
      <div className="p-6 flex items-center gap-x-3">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <Input
          onChange={handleSearch}
          type="search"
          placeholder="Busca personas, publicaciones..."
        />
      </div>
      {combinedResults.length > 0 && (
        <div className="absolute top-16 left-14 right-8 bg-white shadow-md p-4 rounded-md flex flex-col gap-y-1">
          {combinedResults.map((result) => (
            <SearchResult result={result} key={result.id} />
          ))}
        </div>
      )}
    </div>
  );
};
