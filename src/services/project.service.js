import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'https://icapi.bim-cloud.org/api/project/';

class ProjectService {
  getProjects() {
    return axios.get(API_URL + 'get_projects', { headers:{"x-access-token": authHeader()} });
  }

  selectProject(projectid) {
      return axios.post(API_URL + 'select_project', {
          projectid:projectid
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
