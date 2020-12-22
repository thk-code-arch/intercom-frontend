import axios from 'axios';
import authHeader from './auth-header';
const API_URL = process.env.VUE_APP_API_URL+'api/fetch/';


class FetchService {
  fetchVideo(scrapeurl) {
    return axios.post(API_URL + 'video',{"scrapeurl":scrapeurl}, { headers:{"Authorization": authHeader()} });
  }

}

export default new FetchService();
