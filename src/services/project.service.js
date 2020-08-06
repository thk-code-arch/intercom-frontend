import axios from 'axios';
import authHeader from './auth-header';
import projectHeader from './project-header';
const API_URL = process.env.VUE_APP_API_URL+'api/project/';

class ProjectService {
  getProjects() {
    return axios.get(API_URL + 'get_projects', { headers:{"x-access-token": authHeader()} });
  }

  selectProject(theproject) {
      return axios.post(API_URL + 'select_project', {
          projectid: theproject.id
      },{
    headers:{"x-access-token": authHeader()} 
      })
      .then(response => {
        if (response.data.name) {
          localStorage.setItem('project', JSON.stringify(response.data));
        }

        return response.data;
      });
  }
  getProjectinfo() {
      return axios.get(API_URL + 'get_projectinfo',{ headers:{"x-access-token": authHeader(),'x-current-project': projectHeader() } });
  }
  addProject() {
      return axios.post(API_URL + 'add_project',{},{
    headers:{"x-access-token": authHeader()} 
      })
      .then(response => {
        if (response.data.name) {
          localStorage.setItem('project', JSON.stringify(response.data));
        }

        return response.data;
      });
  }
}

export default new ProjectService();
