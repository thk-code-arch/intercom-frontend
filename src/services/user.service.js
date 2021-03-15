import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL+'/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

}

export default new UserService();
