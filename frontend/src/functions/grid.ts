import { colors } from "@/constants/colors";

export const getCodeFromColor = (color: string) => {
  const colorObj = colors.find((c) => c.hex === color);
  return colorObj ? colorObj.code : "00";
};

export const getColorFromCode = (code: string) => {
  const colorObj = colors.find((c) => c.code === code);
  return colorObj ? colorObj.hex : "#FFFFFF";
};
