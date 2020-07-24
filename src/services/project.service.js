import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'https://icapi.bim-cloud.org/api/project/';

class ProjectService {
  getProjects() {
    return axios.get(API_URL + 'get_projects', { headers:{"x-access-token": authHeader()} });
  }

}

export default new ProjectService();
