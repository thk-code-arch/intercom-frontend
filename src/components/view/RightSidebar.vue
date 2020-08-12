<template>
<div class="p-4 flex flex-col h-auto">
    <div class="h-64">
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
        <div class="flex items-start mb-4 text-sm">
            <div class="p-4 flex-1 px-6">
           <div class="conn_players" v-for="(player, players) in connectedPlayers" :key="players">
                <img :src="$profile_image+player.profile_image" class="w-10 h-10 rounded mr-3">
           </div>
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
