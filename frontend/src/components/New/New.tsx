import React from "react";
import { SquarePen } from "lucide-react";

interface Props {
  setCreating: React.Dispatch<React.SetStateAction<boolean>>;
}

const New: React.FC<Props> = ({ setCreating }) => {
  return (
    <button
      onClick={() => setCreating(true)}
      className="fixed p-5 bg-white border shadow-md rounded-md bottom-16 right-3 lg:right-10 hidden lg:flex justify-center items-center outline-none active:scale-90 transition-all"
    >
      <SquarePen className="text-threads h-9 w-9" />
    </button>
  );
};

export default New;
