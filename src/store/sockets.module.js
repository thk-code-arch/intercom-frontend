//This module inits/manages socket connection, when user is logged in
// TODO reconnect when user is logged if connection gets lost

import Vue from "vue";
import store from "../store";
// SocketsIO Chat
import io from "socket.io-client";
import authHeader from "@/services/auth-header";
import VueSocketIO from "vue-socket.io";
import {SOCKETS} from "../services/api"

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
      if (state.chatroomInit === false) {
        const chatsocket = io(SOCKETS + "/chatroom", {
          query: `token=${authHeader().replace("Bearer ", "")}`,
        });
        Vue.use(
          new VueSocketIO({
            connection: chatsocket,
            options: { useConnectionNamespace: true },
            debug: false,
            vuex: {
              store,
              actionPrefix: "CHAT_",
              mutationPrefix: "CHAT_",
            },
          })
        );
        commit("chatroom_initiated");
      }
    },
    init_viewport({ commit, state }) {
      console.log("init viwport socket");
      if (state.viewportInit === false) {
        const playersocket = io(SOCKETS + "/viewport", {
          query: `token=${authHeader().replace("Bearer ", "")}`,
        });
        Vue.use(
          new VueSocketIO({
            debug: false,
            connection: playersocket, //options object is Optional
            options: { useConnectionNamespace: true },
            vuex: {
              store,
              actionPrefix: "PLAYER_",
              mutationPrefix: "PLAYER_",
            },
          })
        );
        commit("viewport_initiated");
      }
    },
    close_sockets({ commit }) {
      this._vm.$socket.viewport.close();
      this._vm.$socket.chatroom.close();
      commit("closeSockets");
    },
  },
  mutations: {
    chatroom_initiated(state) {
      state.chatroomInit = true;
    },
    viewport_initiated(state) {
      state.viewportInit = true;
    },
    closeSockets(state) {
      state.viewportInit = false;
      state.chatroomInit = false;
    },
  },
};
