import axios from 'axios';
import authHeader from './auth-header';
import projectHeader from './project-header';
const API_URL = 'https://icapi.bim-cloud.org/api/chat/';

class ChatService {
  getChatRooms() {
    return axios.get(API_URL + 'get_chatrooms', { headers:{"x-access-token": authHeader()} });
  }

  getChatLog(chatroomID) {
      let payload = {
      headers: {"x-access-token": authHeader()},
      params: {chatroomId: chatroomID},
      }
      return axios.get(API_URL + 'log',payload);
  }
  getProjectChatroom() {
      return axios.get(API_URL + 'get_projectroom',{ headers:{"x-access-token": authHeader(),'x-current-project': projectHeader() } });
  }
}

export default new ChatService();
