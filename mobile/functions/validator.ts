export const isImage = (file: File): boolean => {
  const extensionList: string[] = ["jpg", "jpeg", "gif", "png", "webp", "heic"];
  let extension = file.name?.split(".").pop()?.toLocaleLowerCase() as string;
  return extensionList.indexOf(extension) == -1 ? false : true;
};
