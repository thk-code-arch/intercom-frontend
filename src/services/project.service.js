// Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE

import Vue from 'vue'

class ProjectService {

  selectProject(theproject) {
    return Vue.prototype.$http.post('project/select_project/',{ 
          projectid: theproject.id
      }
      )
      .then(response => {
        if (response.data.name) {
          localStorage.setItem('project', JSON.stringify(response.data));
        }

        return response.data;
      });
  }
  addProject(addProject) {
    return Vue.prototype.$http.post('project/add_project/',addProject
      )
      .then(response => {
        if (response.data.name) {
          localStorage.setItem('project', JSON.stringify(response.data));
        }

        return response.data;
      });
  }
}

export default new ProjectService();
