import axios from 'axios';
import authHeader from './auth-header';
import projectHeader from './project-header';
const API_URL = process.env.VUE_APP_API_URL+'api/chat/';

class ChatService {
  getChatRooms() {
    return axios.get(API_URL + 'get_chatrooms', { headers:{"Authorization": authHeader()} });
  }

  getChatLog(chatroomID) {
      return axios.get(API_URL + 'log/'+chatroomID,{ headers:{"Authorization": authHeader() }});
  }
  getmsgbyid(msgID) {
      return axios.get(API_URL + 'msgbyid/'+msgID,{ headers:{"Authorization": authHeader() }});
  }
  getProjectChatroom() {
      return axios.get(API_URL + 'get_projectroom/'+projectHeader(),{ headers:{"Authorization": authHeader() }});
  }
}
//Authorization
export default new ChatService();
