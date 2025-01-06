import { colors } from "@/constants/colors";
import { PixelArtProps } from "@/interfaces/Post";

export const getCodeFromColor = (color: string) => {
  const colorObj = colors.find((c) => c.hex === color);
  return colorObj ? colorObj.code : "00";
};

export const getColorFromCode = (code: string) => {
  const colorObj = colors.find((c) => c.code === code);
  return colorObj ? colorObj.hex : "#FFFFFF";
};

export const saveGrid = (gridSize: number, grid: string[]): PixelArtProps => {
  const gridData = {
    gridSize,
    cells: grid.map((color) => getCodeFromColor(color)).join(""), // Un solo string.
  };
  return gridData;
};
