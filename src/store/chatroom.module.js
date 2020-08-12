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
    load_chatlog({ commit ,state }, oldroom) {
      if (state.currentchatroom !== 0){
        ChatService.getChatLog(state.currentchatroom).then((message) => {
		commit("loaded_chatlog", message.data);
        this._vm.$socket.chatroom.emit('join_chatroom',{oldRoom: oldroom, newRoom: state.currentchatroom});
        });
      }
    },
    CHAT_sendmessage({ commit, state },data) {
      this._vm.$socket.chatroom.emit('send_message', {message:data, chatroomId: state.currentchatroom});
      commit("CHAT_SENDMESSAGE");
    },
    CHAT_message({ commit }, data) {
      return ChatService.getmsgbyid(data).then((message) => {
		commit("message", message.data);
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
    message(state, data) {
      state.messages = [...state.messages, data];
    },
    CHAT_SENDMESSAGE() {
    }
  }
};



