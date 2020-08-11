import ChatService from "@/services/chat.service";

export const chatroom = {
  namespaced: true,
  state: {
    messages:[],
    currentchatroom:0,
  },
  actions: {
    select_chatroom({ commit }, chatID) {
      commit("Select_Chatroom", chatID);
    },
    load_chatlog({ commit ,state }) {
      if (state.currentchatroom !== 0){
        ChatService.getChatLog(state.currentchatroom).then((message) => {
		commit("loaded_chatlog", message.data);
        this._vm.$socket.emit('join_chatroom', state.currentchatroom);
        });
      }
    },
    CHAT_sendmessage({ commit, state },data) {
      console.log(data);
      this._vm.$socket.emit('send_message', {message:data, chatroomId: state.currentchatroom});
      commit("CHAT_SENDMESSAGE");
    },
    CHAT_message({ commit }, data) {
      return ChatService.getmsgbyid(data).then((message) => {
      console.log("fromaction",message.data);
		commit("CHAT_message", message.data);
      })
    }
  },
  mutations: {
    Select_Chatroom(state, chatID ) {
      state.currentchatroom = chatID;
    },
    loaded_chatlog(state, data ) {
      state.messages = data.chatlogs;
    },
    CHAT_message(state, data) {
      state.messages = [...state.messages, data];
    },
    CHAT_SENDMESSAGE() {
      console.log("SENT");
    }
  }
};



