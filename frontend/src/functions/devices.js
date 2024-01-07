export const isiOS = () => {
  const userAgent = navigator.userAgent;
  return /iPhone|iPod|iPad/.test(userAgent);
};
