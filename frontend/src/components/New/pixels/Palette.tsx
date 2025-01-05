import React from "react";
import { colors } from "@/constants/colors";

interface Props {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

const Palette: React.FC<Props> = ({ selectedColor, setSelectedColor }) => {
  const handleChangeColor = (newColor: string) => {
    setSelectedColor(newColor);
  };

  return (
    <div className="flex flex-wrap items-center gap-x-0.5">
      {colors.map((color) => (
        <div key={color.code} className="flex flex-col items-center">
          <div
            onClick={() => handleChangeColor(color.hex)}
            className="border h-5 w-5 hover:cursor-pointer"
            style={{ backgroundColor: color.hex }}
          ></div>
          {selectedColor === color.hex && (
            <div className="mt-1 h-2 w-2 rounded-full bg-red-400"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Palette;
