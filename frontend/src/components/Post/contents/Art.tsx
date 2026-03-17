import React, { useEffect, useState } from "react";
import { getColorFromCode } from "@/lib/grid";
import { PixelArtProps } from "@/interfaces/Post";

const Art: React.FC<PixelArtProps> = ({ gridSize, cells }) => {
  const [grid, setGrid] = useState<string[]>([]);

  useEffect(() => {
    const loadGrid = (data: { gridSize: number; cells: string }) => {
      setGrid(data.cells.split("").map((code) => getColorFromCode(code)));
    };

    loadGrid({ gridSize: gridSize, cells });
  }, [gridSize, cells]);

  return (
    <div
      className="grid w-full aspect-square"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
      }}
    >
      {grid.map((color, i) => (
        <div
          key={i}
          className="border border-gray-200"
          style={{ backgroundColor: color }}
        ></div>
      ))}
    </div>
  );
};

export default Art;
