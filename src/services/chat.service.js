import axios from 'axios';
import authHeader from './auth-header';
import projectHeader from './project-header';
const API_URL = process.env.VUE_APP_API_URL+'api/chat/';

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
      return axios.get(API_URL + 'get_projectroom/'+projectHeader(),{ headers:{"x-access-token": authHeader() }});
  }
}

export default new ChatService();
