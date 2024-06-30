const TOKEN_KEY = 'token';

export const saveAuthToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};
