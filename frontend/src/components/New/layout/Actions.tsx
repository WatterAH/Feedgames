import React from "react";
import { Check, X } from "lucide-react";

interface Props {
  onClose: () => void;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Actions: React.FC<Props> = ({ onClose, onSubmit }) => {
  return (
    <div className="absolute px-3 md:px-2 flex w-full text-threads justify-between -top-1 left-0">
      <button
        className="rounded-full hover:bg-gray-100 hover:cursor-pointer p-2 transition-all duration-500"
        onClick={onClose}
      >
        <X />
      </button>
      <button
        className="rounded-full hover:bg-gray-100 hover:cursor-pointer p-2 transition-all duration-500"
        onClick={onSubmit}
      >
        <Check />
      </button>
    </div>
  );
};

export default Actions;
