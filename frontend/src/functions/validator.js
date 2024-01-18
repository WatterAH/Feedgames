export const isImage = (file) => {
  const extensionList = ["jpg", "jpeg", "gif", "png", "webp", "heic"];
  let extension = file.name.split(".").pop().toLowerCase();
  return extensionList.indexOf(extension) == -1 ? false : true;
};
