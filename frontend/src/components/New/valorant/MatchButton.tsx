import React from "react";
import Image from "next/image";
import { getThemeColors } from "@/constants/themes";
import { useTheme } from "@/context/ThemeProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

interface Props {
  setIsOpen: (open: boolean) => void;
  matchesLenght: number;
}

const MatchButton: React.FC<Props> = ({ setIsOpen, matchesLenght }) => {
  const { theme } = useTheme();
  const rawColor = getThemeColors(theme).placeholder || "#ffffff";
  const iconColor = rawColor.replace("#", "");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

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
    <Tooltip>
      <TooltipTrigger>
        <Image
          src={`https://img.icons8.com/?size=100&id=GSHWFnD9x56D&format=png&color=${iconColor}`}
          alt="val"
          height={20}
          width={20}
        />
        <TooltipContent>Vincula tu cuenta de Riot</TooltipContent>
      </TooltipTrigger>
    </Tooltip>
  );
};

export default MatchButton;
