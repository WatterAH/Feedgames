export const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

export const getRandomElements = (array, numElements) => {
  const shuffledArray = array.sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, numElements);
};
