import axios from 'axios';

const API_URL = 'https://icapi.bim-cloud.org/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

}

export default new UserService();
