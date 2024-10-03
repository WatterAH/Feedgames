import { MouseEvent } from "react";

export const isImage = (file: File): boolean => {
  const extensionList: string[] = ["jpg", "jpeg", "gif", "png", "webp", "heic"];
  const extension = file.name?.split(".").pop()?.toLocaleLowerCase() as string;
  return extensionList.indexOf(extension) == -1 ? false : true;
};

export const stopPropagation = (e: MouseEvent) => {
  e.stopPropagation();
};
