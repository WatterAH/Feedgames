import React, { useEffect, useState } from "react";
import { GridInterface } from "./Grid";
import { getColorFromCode } from "@/functions/grid";

const Art: React.FC<GridInterface> = ({ gridSize, cells }) => {
  const [grid, setGrid] = useState<string[]>([]);

  useEffect(() => {
    const loadGrid = (data: { gridSize: number; cells: string }) => {
      setGrid(data.cells.split("").map((code) => getColorFromCode(code)));
    };

    loadGrid({ gridSize: gridSize, cells });
  }, [gridSize, cells]);

  return (
    <div
      className="grid w-[25rem] h-[25rem] sm:w-[27rem] sm:h-[27rem]"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
      }}
    >
      {grid.map((color, i) => (
        <div
          key={i}
          className="border"
          style={{ backgroundColor: color }}
        ></div>
      ))}
    </div>
  );
};

export default Art;
