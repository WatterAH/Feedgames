import React, { useState } from "react";
import Input from "../ui/Input";
import { SearchIcon } from "lucide-react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="relative">
      <SearchIcon className="text-(--placeholder) h-5 absolute top-[0.6rem] md:top-3 left-4" />
      <input
        type="text"
        className="py-2 md:py-3 font-montserrat text-base sm:text-sm pl-12 outline-none border border-(--border) rounded-2xl w-full bg-(--background) placeholder-(--placeholder) text-(--text)"
        value={searchTerm}
        maxLength={30}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar mensajes, grupos..."
      />
    </div>
  );
};

export default Search;
