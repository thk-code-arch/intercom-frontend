// Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE

export default function projectHeader() {
  let project = JSON.parse(localStorage.getItem('project'));

  if (project && project.id) {
    return project.id;       // for Node.js Express back-end
  } else {
    return {};
  }
}
