export const API = process.env.VUE_APP_API_URL;
export const FILES = process.env.VUE_APP_API_URL.replace(/\/$/, "");
export const SOCKETS =
  (process.env.VUE_APP_API_URL === "./") ? "/" : process.env.VUE_APP_API_URL;
