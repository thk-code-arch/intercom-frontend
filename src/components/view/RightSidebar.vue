<template>
<div class="p-4 flex flex-col h-auto">
    <div class="h-full">
      <ChatWindow/>
    </div>
  <!-- Online Users -->
  <div v-if="connectedPlayers.length > 0" class="my-4 flex-1 flex flex-col bg-white overflow-hidden">
        <!-- Top bar -->
        <div class="border-b flex px-6 py-2 items-center flex-none">
            <div class="flex flex-col">
                <h3 class="text-grey-darkest mb-1 font-extrabold">Online Users</h3>
            </div>
        </div>
        <!-- TEXT -->
        <div class="flex flex-row mb-4 p-2 text-sm">
           <div class="m-1 tooltip" v-for="(player, players) in connectedPlayers" :key="players">
                <img :src="$profile_image+player.profile_image" class="w-10 h-10 rounded">
                <span class='tooltip-text bg-white border w-10 h-10 items-center p-2 rounded'>
                  <svg v-on:click="getPlayercamPos(player)" viewBox="0 0 20 20" fill="currentColor" class="camera w-6 h-6"><path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path></svg>
                </span>
           </div>
        </div>
  </div>
</div>
</template>

<script>

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
      return this.$store.state.viewport.camPosi
    },
    connectedPlayers () {
      return this.$store.state.viewport.players
    }
  },
  data: function() {
    return {
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
        this.$store.dispatch('viewport/push_position');
        }
    }
  },
  methods: {
    getPlayercamPos(player) {
    console.log("clicked",player.position)
    this.$store.dispatch('viewport/getcamPos', player)
    }

  },
  destroyed(){
        this.$store.dispatch('viewport/leave_viewport');
   },
  created(){
      //init message delay
      this.gotlastcamPos = moment();
      console.log(this.gotlastcamPos);
  },
  mounted(){
      //init viewport socket
      this.$store.dispatch('iosockets/init_viewport');
      // join viewport room
      this.$store.dispatch('viewport/join_viewport');
  }
};
</script>
