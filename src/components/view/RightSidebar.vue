<template>
  <div class="h-full w-full flex flex-col h-full p-4">
    <ChatWindow />
    <OnlineUsers v-if="connectedPlayers.length > 0" />
    <!-- Online Users -->
  </div>
</template>

<script>
import ChatWindow from "@/components/ChatWindow";
import OnlineUsers from "./Right.OnlineUsers";

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
      this.timenow = this.$moment();
      this.mseconds = this.timenow.diff(this.gotlastcamPos);
      if (this.mseconds > 500) {
        this.gotlastcamPos = this.$moment();
        this.$store.dispatch("viewport/push_position");
      }
    },
  },
  created() {
    //init message delay
    this.gotlastcamPos = this.$moment();
  },
  mounted() {
    //init viewport socket
    this.$store.dispatch("iosockets/init_viewport");
  },
};
</script>
