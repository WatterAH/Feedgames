export const getToken = () => {
  const token = document.cookie;
  return token.slice(6);
};
