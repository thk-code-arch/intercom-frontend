// Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE

export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    return "Bearer "+user.accessToken;       // for Node.js Express back-end
  } else {
    return {};
  }
}
