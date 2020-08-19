<template>
<div class="flex flex-col h-auto p-4">
    <div class="h-full">
      <ChatWindow/>
    </div>
  <!-- Online Users -->
  <div v-if="connectedPlayers.length > 0" class="flex flex-col flex-1 my-4 overflow-hidden bg-white">
        <!-- Top bar -->
        <div class="flex items-center flex-none px-6 py-2 border-b">
            <div class="flex flex-col">
                <h3 class="mb-1 font-extrabold text-grey-darkest">Online Users</h3>
            </div>
        </div>
        <!-- TEXT -->
        <div class="flex flex-row p-2 mb-4 text-sm">
           <div class="m-1 tooltip" v-for="(player, players) in connectedPlayers" :key="players">
                <img :src="$profile_image+player.profile_image" class="w-10 h-10 rounded cursor-pointer" v-on:click="getPlayercamPos(player)">
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
