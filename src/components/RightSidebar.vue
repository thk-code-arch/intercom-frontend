<template>
<div class="px-4">
    <ChatWindow :chatroomid="projectchatroom"/>
  <!-- Online Users -->
  <div class="my-4 flex-1 flex flex-col bg-white overflow-hidden">
        <!-- Top bar -->
        <div class="border-b flex px-6 py-2 items-center flex-none">
            <div class="flex flex-col">
                <h3 class="text-grey-darkest mb-1 font-extrabold">Online Users</h3>
            </div>
        </div>
        <!-- TEXT -->
        <div class="flex items-start mb-4 text-sm">
            <div class="flex-1 px-6">
              <p class="text-black leading-normal">
                {{ userposition }}
              </p>
            </div>
        </div>
  </div>
</div>
</template>

<script>

import ChatService from "../services/chat.service";
import ChatWindow from "../components/ChatWindow";

import authHeader from '../services/auth-header';
import Vue from 'vue'
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
const socket = io('https://io.bim-cloud.org', {
  query: `token=${authHeader()}`
});
Vue.use(VueSocketIOExt, socket);
export default {
  name: "right-sidebar",
  components: {
    ChatWindow,
  },
  props:["camPos"],
  data: function() {
    return {
      projectchatroom: [],
      userposition: {},
    }
  },
    sockets: {
    connect() {
      console.log('socket connected')
    },
    camPos() {
    },
    usercamPos(data) {
      this.userposition = data;
    }
  },
  watch: {
    camPos: function (val) {
      // this.$socket.client is `socket.io-client` instance
      this.$socket.client.emit('camPos',  {
                message: val
            });
    }
  },
  created(){
      ChatService.getProjectChatroom().then(
      response => {
        this.projectchatroom = response.data.id;
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
