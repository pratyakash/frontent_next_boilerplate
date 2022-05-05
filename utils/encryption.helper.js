import * as aes from "crypto-js/aes";
import * as cryptoJS from "crypto-js";
import { constants } from "./constants";

export const encryptText = (textToEncrypt, key = "") => {
  if (key === "") key = constants.ENCRYPTION_SALT;
  if (!textToEncrypt || textToEncrypt === "") return "";

  return aes.encrypt(textToEncrypt, key);
};

export const decryptText = (textToDecrypt, key = "") => {
  if (key === "") key = constants.ENCRYPTION_SALT;
  if (!textToDecrypt || textToDecrypt === "") return "";

  return aes.decrypt(textToDecrypt, key).toString(cryptoJS.enc.Utf8);
};
