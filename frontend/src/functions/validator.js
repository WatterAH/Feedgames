export const isImage = (file) => {
  const extensionList = ["jpg", "jpeg", "gif", "png", "webp", "heif"];
  let extension = file.name.split(".").pop().toLowerCase();
  return extensionList.indexOf(extension) == -1 ? false : true;
};
