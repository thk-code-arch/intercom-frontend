const messages = [];
export const chatroom = {
  namespaced: true,
  state: {
    messages,
  },
  actions: {
    CHAT_sendmessage({ commit },data) {
      console.log(data);
      this._vm.$socket.emit('send_message', {message:data});
      commit("CHAT_SENDMESSAGE");
    },
  },
  mutations: {
    CHAT_message(state, data) {
      console.log(data);
      state.messages = [...state.messages, data];
    },
    CHAT_SENDMESSAGE() {
      console.log("SENT");
    }
  }
};



