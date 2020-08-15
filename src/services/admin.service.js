import axios from 'axios';
import authHeader from './auth-header';
const API_URL = process.env.VUE_APP_API_URL+'api/admin/';

class AdminService {
  getUsers() {
    return axios.get(API_URL + 'get_users', { headers:{"x-access-token": authHeader()} });
  }
  getProjects() {
    return axios.get(API_URL + 'get_projects', { headers:{"x-access-token": authHeader()} });
  }
  getChatrooms() {
    return axios.get(API_URL + 'get_chatrooms', { headers:{"x-access-token": authHeader()} });
  }
}

export default new AdminService();
