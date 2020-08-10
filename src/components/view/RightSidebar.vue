<template>
<div class="p-4 flex flex-col h-auto">
    <div class="h-64">
      <ChatWindow :chatroomid="projectchatroom"/>
    </div>
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
                {{ connectedPlayers }}
              </p>
            </div>
        </div>
  </div>
</div>
</template>

<script>

import ChatService from "@/services/chat.service";
import ChatWindow from "@/components/ChatWindow";

import Vue from 'vue'
Vue.use(require('vue-moment'));
import moment from 'moment'

export default {
  name: "right-sidebar",
  components: {
        ChatWindow,
  },
  computed: {
    camPosi () {
      return this.$store.state.viewport.ownCam.position
    },
    connectedPlayers () {
      return this.$store.state.viewport.players
    }
  },
  data: function() {
    return {
      projectchatroom: [],
      userposition: {},
      gotlastcamPos: 1,
      mseconds: 0
    }
  },
  watch: {
    camPosi: function (val) {
      //dont send too much coordinates in a second
      this.timenow =  moment();
      this.mseconds = this.timenow.diff(this.gotlastcamPos);
      if (this.mseconds > 500){
        this.gotlastcamPos = moment();
        console.log(val)
        this.$store.dispatch('viewport/move');
        }
    }
  },
  destroyed(){
        this.$store.dispatch('viewport/byebye');
   },
  created(){
      //init message delay
      this.gotlastcamPos = moment();
      console.log(this.gotlastcamPos);
      //get actaual chatroomid
      ChatService.getProjectChatroom().then(
      response => {
        this.projectchatroom = response.data.id;
        // connect to room
        this.$store.dispatch('viewport/PLAYER_newplayer');
        this.$store.dispatch('viewport/listplayer');
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
