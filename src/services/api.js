// Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE

export const API =
  (process.env.VUE_APP_API_URL === "./") ? 'https://'+location.host : process.env.VUE_APP_API_URL;
export const FILES =
  (process.env.VUE_APP_API_URL === "./") ? 'https://'+location.host : process.env.VUE_APP_API_URL;
export const SOCKETS =
  (process.env.VUE_APP_API_URL === "./") ? 'https://'+location.host : process.env.VUE_APP_API_URL;
