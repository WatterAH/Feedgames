import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  gridSize: number;
  setGridSize: (size: number) => void;
  grid: string[];
  setGrid: (grid: string[]) => void;
}

const Sizing: React.FC<Props> = ({ gridSize, setGridSize, grid, setGrid }) => {
  const handleSize = (newGridSize: number) => {
    if (grid.every((cell) => cell == "#FFFFFF")) {
      if (newGridSize > 1 && newGridSize < 29) {
        setGridSize(newGridSize);
        setGrid(Array(newGridSize * newGridSize).fill("#FFFFFF"));
      }
    }
  };

  return (
    <div className="flex items-center text-xl font-medium font-montserrat">
      <div className="w-10">
        <h3>x{gridSize}</h3>
      </div>
      <div className="flex items-center">
        <button onClick={() => handleSize(gridSize - 1)}>
          <ChevronLeft className="text-secondaryicon" />
        </button>
        <button onClick={() => handleSize(gridSize + 1)}>
          <ChevronRight className="text-secondaryicon" />
        </button>
      </div>
    </div>
  );
};

export default Sizing;
