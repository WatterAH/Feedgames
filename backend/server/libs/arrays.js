export const findMaxItem = (arr) => {
  const maxItem = Math.max(...arr);
  return arr.indexOf(maxItem);
};

export const joinObjects = (index1, index2, arr) => {
  if (arr[index1].id == arr[index2].id) {
    return [arr[index1]];
  } else {
    return [arr[index1], arr[index2]];
  }
};
