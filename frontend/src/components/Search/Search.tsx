import React, { useState } from "react";
import { Input } from "../Input";
import { toast } from "react-toastify";
import { MapResults } from "./MapResults";
import { searchFor } from "../../api/actions";
import { User } from "../../interfaces/User";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<User[]>([]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setSearchTerm(e.target.value);
      const resultsFetched = await searchFor(searchTerm);
      setResults(resultsFetched);
    } catch (error) {
      toast.error("Ocurrio un error", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const resultCondition = searchTerm ? results : [];

  return (
    <div className="relative">
      <div className="p-6 flex items-center gap-x-3">
        <MagnifyingGlassIcon
          aria-hidden="true"
          className="h-6 dark:text-white"
        />
        <Input
          onChange={handleSearch}
          type="search"
          placeholder="Busca personas..."
        />
      </div>
      {resultCondition.length > 0 && <MapResults results={resultCondition} />}
    </div>
  );
};
