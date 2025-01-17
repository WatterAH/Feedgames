import React, { useEffect, useState } from "react";
import Image from "next/image";
import Tooltip from "@/components/Global/Tooltip";
import { getThemeColors } from "@/constants/themes";

interface Props {
  setIsOpen: (open: boolean) => void;
  matchesLenght: number;
}

const MatchButton: React.FC<Props> = ({ setIsOpen, matchesLenght }) => {
  const [iconColor, setIconColor] = useState("b3b3b3");
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || "theme-default";
    const placeholdercolor = getThemeColors(currentTheme).placeholder;
    setIconColor(placeholdercolor);
  }, []);

  return matchesLenght > 0 ? (
    <button onClick={handleClick}>
      <Image
        src={`https://img.icons8.com/?size=100&id=GSHWFnD9x56D&format=png&color=${iconColor}`}
        alt="val"
        height={20}
        width={20}
      />
    </button>
  ) : (
    <Tooltip text="Vincula con Riot Games">
      <Image
        src={`https://img.icons8.com/?size=100&id=GSHWFnD9x56D&format=png&color=${iconColor}`}
        alt="val"
        height={20}
        width={20}
      />
    </Tooltip>
  );
};

export default MatchButton;
