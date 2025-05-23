import React, { useState } from "react";
import Palette from "./Palette";
import Sizing from "./Sizing";
import Modal from "@/components/Global/Modal";
import Actions from "../layout/Actions";
import { PaletteIcon } from "lucide-react";
import { saveGrid } from "@/functions/grid";
import { ContentObject } from "@/interfaces/Post";

interface Props {
  setContent: (content: ContentObject) => void;
}

const Canvas: React.FC<Props> = ({ setContent }) => {
  const [open, setOpen] = useState(false);
  const [gridSize, setGridSize] = useState(10);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [grid, setGrid] = useState<string[]>(
    Array(gridSize * gridSize).fill("#FFFFFF")
  );

  const handleClick = (index: number) => {
    const newGrid = [...grid];
    newGrid[index] = selectedColor;
    setGrid(newGrid);
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    const art = saveGrid(gridSize, grid);
    setContent({ type: "pixelart", data: art });
    setOpen(false);
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <PaletteIcon className="text-placeholder h-5" />
      </button>

      <Modal
        open={open}
        setOpen={setOpen}
        onClose={handleClose}
        title="Pixel Arts"
      >
        <Actions onClose={handleClose} onSubmit={handleSubmit} />
        <div className="flex flex-col items-center justify-center p-3 gap-2">
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
          <div className="max-w-sm w-full">
            <div
              className="grid w-full aspect-square"
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
        </div>
      </Modal>
    </>
  );
};

export default Canvas;
