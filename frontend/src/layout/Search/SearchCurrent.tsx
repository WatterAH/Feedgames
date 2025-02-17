import React from "react";
import { ChevronRight, Search } from "lucide-react";

interface Props {
  searchTerm: string;
  setCurrent: (current: string) => void;
}

const SearchCurrent: React.FC<Props> = ({ searchTerm, setCurrent }) => {
  const handleClick = () => {
    setCurrent(searchTerm);
  };

  return (
    <div
      className="flex items-center justify-between w-full border-b border-border pb-4 px-6 hover:cursor-pointer"
      onClick={handleClick}
    >
      <span className="flex items-end gap-x-3">
        <Search className="text-placeholder h-5" />
        <p className="text-text">
          Buscar <span className="font-semibold">{searchTerm}</span>
        </p>
      </span>
      <ChevronRight className="text-placeholder h-6" />
    </div>
  );
};

export default SearchCurrent;
