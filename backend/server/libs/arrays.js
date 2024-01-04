export const findMaxItem = (arr) => {
  const maxItem = Math.max(...arr);
  if (maxItem == 0) {
    return -1;
  }
  return arr.indexOf(maxItem);
};

export const joinObjects = (arrIndex, arr) => {
  arr = [arr[arrIndex[0]], arr[arrIndex[1]], arr[arrIndex[2]]];
  return arr.filter((current) => current != undefined);
};

export const uniques = (arr) => {
  return arr.filter((item, index, arr) => {
    return arr.indexOf(item) === index;
  });
};
