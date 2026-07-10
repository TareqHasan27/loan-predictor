const TOKEN_KEY = "token";
const USER_KEY = "user";

const notifyAuthChange = () => {
  window.dispatchEvent(new Event("auth-changed"));
};

export const saveAuthData = ({ token, user }) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  notifyAuthChange();
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getStoredUser = () => {
  const storedUser = localStorage.getItem(USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    clearAuthData();
    return null;
  }
};

export const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  notifyAuthChange();
};

export const isAuthenticated = () => {
  return Boolean(getAuthToken());
};