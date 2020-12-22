import axios from 'axios';
import authHeader from './auth-header';
var API_URL = process.env.VUE_APP_API_URL+'api/admin/';

class AdminService {
  getUsers() {
    return axios.get(API_URL + 'get_users', { headers:{"Authorization": authHeader()} });
  }
  getProjects() {
    return axios.get(API_URL + 'get_projects', { headers:{"Authorization": authHeader()} });
  }
  getChatrooms() {
    return axios.get(API_URL + 'get_chatrooms', { headers:{"Authorization": authHeader()} });
  }
  rmRole(therole, theuserid) {
    return axios.post(API_URL + 'rm_role/'+therole+'/'+theuserid,{}, { headers:{"Authorization": authHeader()} });
  }
  addRole(therole, theuserid) {
    return axios.post(API_URL + 'add_role/'+therole+'/'+theuserid,{},{ headers:{"Authorization": authHeader() } });
  }
}

export default new AdminService();
