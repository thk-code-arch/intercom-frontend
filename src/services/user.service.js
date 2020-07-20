import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://icapi.bim-cloud.org/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers:{"x-access-token": authHeader()} });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers:{"x-access-token": authHeader()} });
  }
}

export default new UserService();
