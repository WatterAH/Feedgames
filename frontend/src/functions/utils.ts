import copy from "clipboard-copy";
import { MouseEvent } from "react";

export const isImage = (file: File): boolean => {
  const extensionList: string[] = ["jpg", "jpeg", "gif", "png", "webp", "heic"];
  const extension = file.name?.split(".").pop()?.toLocaleLowerCase() as string;
  return extensionList.indexOf(extension) == -1 ? false : true;
};

export const stopPropagation = (e: MouseEvent) => {
  e.stopPropagation();
};

export const formatNumber = (number: number | undefined): string | number => {
  const safeNum = number ?? 0;
  if (safeNum >= 1e6) {
    return (safeNum / 1e6).toFixed(1) + "M";
  } else if (safeNum >= 1e3) {
    return (safeNum / 1e3).toFixed(1) + "K";
  } else {
    return safeNum;
  }
};

export const share = (content: "u" | "p", id: string) => {
  if (navigator.share) {
    navigator.share({
      url: `https://feedgames.vercel.app/${content}/${id}`,
    });
  } else {
    copy(`https://feedgames.vercel.app/${content}/${id}`);
  }
};
