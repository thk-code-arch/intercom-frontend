<template>
  <div class="flex flex-col h-full p-4">
    <div class="h-full">
      <ChatWindow />
      <OnlineUsers v-if="connectedPlayers.length > 0" />
      <!-- Online Users -->
    </div>
  </div>
</template>

<script>
import ChatWindow from "@/components/ChatWindow";
import OnlineUsers from "./Right.OnlineUsers";

import Vue from "vue";
Vue.use(require("vue-moment"));
import moment from "moment";

export default {
  name: "right-sidebar",
  components: {
    ChatWindow,
    OnlineUsers,
  },
  computed: {
    camPosi() {
      return this.$store.state.viewport.camPosi;
    },
    connectedPlayers() {
      return this.$store.state.viewport.players;
    },
  },
  data: function () {
    return {
      userposition: {},
      gotlastcamPos: 1,
      mseconds: 0,
    };
  },
  watch: {
    camPosi() {
      //dont send too much coordinates in a second
      this.timenow = moment();
      this.mseconds = this.timenow.diff(this.gotlastcamPos);
      if (this.mseconds > 500) {
        this.gotlastcamPos = moment();
        this.$store.dispatch("viewport/push_position");
      }
    },
  },
  destroyed() {
    this.$store.dispatch("viewport/leave_viewport");
  },
  created() {
    //init message delay
    this.gotlastcamPos = moment();
    console.log(this.gotlastcamPos);
  },
  mounted() {
    //init viewport socket
    this.$store.dispatch("iosockets/init_viewport");
    // join viewport room
    this.$store.dispatch("viewport/join_viewport");
  },
};
</script>
