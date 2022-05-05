import { constants } from "./constants";
import * as encryption from "./encryption.helper";

const sessionKeys = constants.SESSION_KEYS;

export const getToken = () => {
  return getFromSession(sessionKeys.TOKEN);
};

export const saveInSession = (key, value) => {
  localStorage.setItem(key, shouldTextBeEncrypted === true ? encryption.encryptText(value) : value);
};

export const getFromSession = (key) => {
  const item = localStorage.getItem(key);

  return shouldTextBeEncrypted === true ? encryption.decryptText(item) : item;
};

export const saveToken = (token) => {
  return localStorage.setItem(sessionKeys.TOKEN, token);
};

export const saveRefreshToken = (token) => {
  return localStorage.setItem(sessionKeys.REFRESH_TOKEN, token);
};
