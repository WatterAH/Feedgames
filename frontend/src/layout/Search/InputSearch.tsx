import React from "react";
import { Search, X } from "lucide-react";

interface Props {
  searchTerm: string;
  onChange: (term: string) => void;
  setCurrent: (curretn: string) => void;
}

const InputSearch: React.FC<Props> = ({ searchTerm, onChange, setCurrent }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setCurrent("");
  };
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="relative">
      <Search className="text-icon h-5 absolute top-3 left-4" />
      <input
        type="text"
        className="p-3 font-montserrat text-base sm:text-sm pl-12 outline-none border border-border rounded-2xl w-full bg-background placeholder-icon text-text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Busca personas, posts..."
      />
      {searchTerm.trim().length > 0 && (
        <button onClick={handleClear}>
          <X className="text-icon h-5 absolute top-4 right-3" />
        </button>
      )}
    </div>
  );
};

export default InputSearch;
