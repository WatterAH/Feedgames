import React, { useState } from "react";
import Palette from "./Palette";
import Sizing from "./Sizing";

export interface GridInterface {
  gridSize: number;
  cells: string;
}

const Grid: React.FC<GridInterface> = ({ gridSize: size }) => {
  const [gridSize, setGridSize] = useState(size);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [grid, setGrid] = useState<string[]>(
    Array(gridSize * gridSize).fill("#FFFFFF")
  );

  const handleClick = (index: number) => {
    const newGrid = [...grid];
    newGrid[index] = selectedColor;
    setGrid(newGrid);
  };

  return (
    <div className="flex flex-col gap-2">
      <Palette
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <Sizing
        grid={grid}
        gridSize={gridSize}
        setGrid={setGrid}
        setGridSize={setGridSize}
      />
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
            onClick={() => handleClick(i)}
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
