<template>
  <div class="h-32 flex flex-col flex-1 my-4 bg-white">
    <!-- Top bar -->
    <div class="flex items-center flex-none px-6 py-2 border-b">
      <div class="flex flex-col">
        <h3 class="mb-1 font-extrabold text-grey-darkest">Online Users</h3>
      </div>
    </div>
    <!-- TEXT -->
    <div class="flex flex-row p-2 mb-4 text-sm">
      <div
        class="m-1 tooltip"
        v-for="(player, players) in connectedPlayers"
        :key="players"
      >
        <img
          :src="player.profile_image"
          class="w-10 h-10 rounded cursor-pointer"
          v-on:click="getPlayercamPos(player)"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "OnlineUsers",
  data() {
    return {};
  },
  computed: {
    camPosi() {
      return this.$store.state.viewport.camPosi;
    },
    connectedPlayers() {
      return this.$store.state.viewport.players;
    },
  },
  methods: {
    getPlayercamPos(player) {
      console.log("moveToPlayer", player.position);
      this.$store.dispatch("viewport/getcamPos", player);
    },
  },
};
</script>
