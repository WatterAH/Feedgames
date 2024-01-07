export const getToken = () => {
  const token = document.cookie;
  return token.slice(6);
};

export const setCookie = (token) => {
  const currentDate = new Date();
  const expirationDate = new Date(
    currentDate.getTime() + 30 * 24 * 60 * 60 * 1000
  );
  const expiresUTC = expirationDate.toUTCString();
  document.cookie = `token=${token}; expires=${expiresUTC}; secure;`;
};
