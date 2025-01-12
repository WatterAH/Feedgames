import React from "react";
import Image from "next/image";
import Tooltip from "@/components/Global/Tooltip";

interface Props {
  setIsOpen: (open: boolean) => void;
  matchesLenght: number;
}

const MatchButton: React.FC<Props> = ({ setIsOpen, matchesLenght }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  return matchesLenght > 0 ? (
    <button onClick={handleClick}>
      <Image
        src="https://img.icons8.com/?size=100&id=GSHWFnD9x56D&format=png&color=999999"
        alt="val"
        height={20}
        width={20}
      />
    </button>
  ) : (
    <Tooltip text="Vincula con Riot Games">
      <Image
        src="https://img.icons8.com/?size=100&id=GSHWFnD9x56D&format=png&color=e5e7eb"
        alt="val"
        height={20}
        width={20}
      />
    </Tooltip>
  );
};

export default MatchButton;
