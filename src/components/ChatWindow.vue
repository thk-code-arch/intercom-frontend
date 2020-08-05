<template>
    <!-- Chat content -->
    <div class="my-4 h-64 flex-1 flex flex-col  w-full bg-white overflow-hidden">
        <!-- Top bar -->
        <div class="border-b flex px-6 py-2 items-center flex-none">
            <div class="flex flex-col">
                <h3 class="text-grey-darkest mb-1 font-extrabold">#ChatRoomName</h3>
                <div class="text-grey-dark text-sm truncate">
                  Project Description
                </div>
            </div>
        </div>
        <!-- Chat messages -->
        <!-- Chat messages -->
        <div class="px-6 py-4 flex-1 overflow-y-scroll" v-chat-scroll>
            <!-- A message -->
            <div class="messages" v-for="(msg, index) in messages" :key="index">
            <div class="flex items-start mb-4 text-sm">
                <img :src="msg.profile_image" class="w-10 h-10 rounded mr-3">
                <div class="flex-1 overflow-hidden">
                    <div>
                        <span class="font-bold">{{ msg.username }}</span>
                        <span class="text-grey text-xs"> {{ msg.time }}</span>
                    </div>
                    <p class="text-black leading-normal">{{ msg.message }}</p>
                </div>
            </div>
            </div>
            <!-- A message -->
        </div>
        <!-- New message -->
        <div class="pb-6 px-4 flex-none">
            <div class="flex rounded-lg border-2 border-grey overflow-hidden">
                <span class="text-3xl text-grey border-r-2 border-grey p-2">
                    <svg class="fill-current h-6 w-6 block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z"/></svg>
                  </span>
          <form @submit.prevent="clickButton()">
                <input v-model="message" type="text"  class="w-full px-4" placeholder="Message #general" />
                <button type="submit" :disabled="message.length == 0"></button>
          </form>
            </div>
        </div>
    </div>
</template>

<script>

import authHeader from '../services/auth-header';
import ChatService from "../services/chat.service";
import Vue from 'vue'
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
const socket = io('https://io.bim-cloud.org', {
  query: `token=${authHeader()}`
});
Vue.use(VueSocketIOExt, socket);

export default {
  name: "ChatWindow",
    data() {
        return {
            message: '',
            messages: [],
        }
    },
  props: {
    chatroomid: {
      type: Array,
      required: true,
    }
    },
    sockets: {
    connect() {
      console.log('socket connected')
    },
    SEND_MESSAGE() {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    },
    MESSAGE(data) {
      this.messages = [...this.messages, data];
      console.log('message receuved')
    }
  },
  methods: {
    clickButton() {
      // this.$socket.client is `socket.io-client` instance
      this.$socket.client.emit('SEND_MESSAGE',  {
                message: this.message
            });
      this.message = '';
    }
  },
  created(){
      ChatService.getChatLog(1).then(
      response => {
        console.log(response.data);
      },
      error => {
        console.log(error);
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>
