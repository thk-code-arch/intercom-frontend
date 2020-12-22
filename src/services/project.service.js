import axios from 'axios';
import authHeader from './auth-header';
const API_URL = process.env.VUE_APP_API_URL+'api/project/';

class ProjectService {

  selectProject(theproject) {
      return axios.post(API_URL + 'select_project', {
          projectid: theproject.id
      },{
    headers:{"Authorization": authHeader()} 
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
    headers:{"Authorization": authHeader()} 
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
