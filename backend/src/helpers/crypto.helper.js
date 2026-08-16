import CryptoJS from "crypto-js";
import { ENV } from "../config/env.js";

const SECRET_KEY = ENV.SECRET_KEY;

export const encryptedMessage = (message) => {
  return CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
};

export const decryptedMessage = (message) => {
  const bytes = CryptoJS.AES.decrypt(message, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
