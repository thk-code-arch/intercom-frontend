// Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE

export const chatroom = {
  namespaced: true,
  state: {
    messages:[],
    currentchatroom:0,
    theroom:[]
  },
  actions: {
    select_chatroom({ commit }, chatID) {
      commit("Select_Chatroom", chatID);
    },
    load_chatlog({ commit ,state }, oldroom) {
      if (state.currentchatroom !== 0){
        this._vm.$http.get('chat/log/'+state.currentchatroom).then((message) => {
		commit("loaded_chatlog", message.data);
        commit("loaded_theroom", {name: message.data.name,description: message.data.description});
        this._vm.$socket.chatroom.emit('join_chatroom',{oldRoom: oldroom, newRoom: state.currentchatroom});
        });
      }
    },
    CHAT_sendmessage({ commit, state },data) {
      this._vm.$socket.chatroom.emit('send_message', {message:data, chatroomId: state.currentchatroom});
      commit("CHAT_SENDMESSAGE");
    },
    CHAT_message({ commit }, data) {
    return this._vm.$http.get('chat/msgbyid/'+data).then((message) => {
		commit("message", message.data);
      })
    },
    clear({commit, state}){
      if (state.currentchatroom !== 0){
      this._vm.$socket.chatroom.emit('disconnect',{chatroomId: state.currentchatroom});
      }
      commit('clear');
    }
  },
  mutations: {
    Select_Chatroom(state, chatID ) {
      state.currentchatroom = chatID;
    },
    loaded_chatlog(state, data ) {
      state.messages = data.chatlog;
    },
    loaded_theroom(state, data ) {
      state.theroom = data;
    },
    message(state, data) {
      state.messages = [...state.messages, data];
    },
    CHAT_SENDMESSAGE() {
    },
    clear(state) {
      state.messages =[];
      state.theroom =[];
      state.currentchatroom =0;
    }
  },
  getters:{
    asc_messages:(state) => {
      return state.messages.sort(function(a, b) {
        var c = new Date(a.time);
        var d = new Date(b.time);
        return c-d;
    });
    }
  }
};



