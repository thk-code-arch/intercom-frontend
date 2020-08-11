import ChatService from "@/services/chat.service";

export const chatroom = {
  namespaced: true,
  state: {
    messages:[],
    currentchatroom:1,
  },
  actions: {
    load_chatlog({ commit ,state }) {
      return ChatService.getChatLog(state.currentchatroom).then((message) => {
		commit("CHAT_message", message.chatlogs);
        this._vm.$socket.emit('join_chatroom', state.currentchatroom);
      })
    },
    CHAT_sendmessage({ commit },data) {
      console.log(data);
      this._vm.$socket.emit('send_message', {message:data});
      commit("CHAT_SENDMESSAGE");
    },
    CHAT_message({ commit }, data) {
      console.log("fromaction",data);
      return ChatService.getmsgbyid(data).then((message) => {
		commit("CHAT_message", message.chatlogs);
      })
    }
  },
  mutations: {
    CHAT_message(state, data) {
      state.messages = [...state.messages, data];
    },
    CHAT_SENDMESSAGE() {
      console.log("SENT");
    }
  }
};



