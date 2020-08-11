//This module inits/manages socket connection, when user is logged in
// TODO reconnect when user is logged if connection gets lost

import Vue from 'vue'
import store from '../store'
// SocketsIO Chat
import io from 'socket.io-client';
import authHeader from '@/services/auth-header';
import VueSocketIO from 'vue-socket.io'


export const iosockets = {
  namespaced: true,
  state: {
    chatroomInit: false,
    viewportInit: false,
    chatroomConnected: false,
    viewportConnected: false,
  },
  actions: {
    init_chatroom({ commit, state }) {
      if (state.chatroomInit === false){
        const chatsocket = io(process.env.VUE_APP_IO_URL+'chatroom', {
          query: `token=${authHeader()}`
        });
        Vue.use(
          new VueSocketIO({
            connection: chatsocket,
            debug: true,
            vuex: {
              store,
              options: { useConnectionNamespace: true },
              actionPrefix: 'CHAT_',
              mutationPrefix: "CHAT_"
            },
          }),
        );
        commit('chatroom_initiated');
      }
    },
    init_viewport({ commit , state }) {
      if (state.chatroomInit === false){
        const playersocket = io(process.env.VUE_APP_IO_URL+'viewport', {
          query: `token=${authHeader()}`
        });
        Vue.use(new VueSocketIO({
            debug: true,
            connection: playersocket, //options object is Optional
            vuex: {
              store,
              options: { useConnectionNamespace: true },
              actionPrefix: "PLAYER_",
              mutationPrefix: "PLAYER_"
            }
          })
        );
        commit('viewport_initiated');
      }
    },
  },
  mutations: {
    chatroom_initiated(state) {
      state.chatroomInit = true;
    },
    viewport_initiated(state) {
      state.viewportInit = true;
    }
  }
};



