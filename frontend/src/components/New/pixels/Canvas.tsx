import React, { useState } from "react";
import Palette from "./Palette";
import Sizing from "./Sizing";
import { Check, PaletteIcon, X } from "lucide-react";
import { saveGrid } from "@/lib/grid";
import { ContentObject } from "@/interfaces/Post";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  setContent: (content: ContentObject) => void;
}

const Canvas: React.FC<Props> = ({ setContent }) => {
  const [open, setOpen] = useState(false);
  const [gridSize, setGridSize] = useState(10);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [grid, setGrid] = useState<string[]>(
    Array(gridSize * gridSize).fill("#FFFFFF"),
  );

  const handleClick = (index: number) => {
    const newGrid = [...grid];
    newGrid[index] = selectedColor;
    setGrid(newGrid);
  };

  const handleSubmit = () => {
    const art = saveGrid(gridSize, grid);
    setContent({ type: "pixelart", data: art });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer">
        <PaletteIcon className="text-(--placeholder) h-5" />
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-lg">
        <DialogHeader className="border-b p-2">
          <div className="flex w-full text-(--text) items-center justify-between">
            <button
              onClick={() => setOpen(false)}
              className="rounded-full hover:bg-(--hover) p-2 transition-all duration-500"
            >
              <X />
            </button>
            <DialogTitle>Pixel Arts</DialogTitle>
            <button
              onClick={handleSubmit}
              className="rounded-full hover:bg-(--hover) p-2 transition-all duration-500"
            >
              <Check />
            </button>
          </div>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center pb-6 gap-2">
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
                  className="border border-gray-200"
                  onClick={() => handleClick(i)}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Canvas;
