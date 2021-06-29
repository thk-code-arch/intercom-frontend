<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div class="flex flex-col my-4 bg-white">
    <!-- Top bar -->
    <div class="flex items-center flex-none px-6 py-2 border-b">
      <div class="flex flex-col">
        <h3 class="mb-1 font-extrabold text-grey-darkest">Online Users</h3>
      </div>
    </div>
    <!-- TEXT -->
    <div class="flex flex-wrap p-2 mb-4 text-sm">
      <div
        class="m-1"
        v-for="(player, players) in connectedPlayers"
        :key="players"
      >
        <div class="has-tooltip">
          <span
            class="the-tooltip rounded p-1 bg-codearch-500 text-white -mt-8"
            >{{ player.username }}</span
          >
          <img
            :src="player.profile_image"
            class="w-10 h-10 rounded cursor-pointer bg-codearch-500"
            v-on:click="getPlayercamPos(player)"
            :alt="player.username"
          />
        </div>
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
      this.$store.dispatch("viewport/getcamPos", player);
    },
  },
};
</script>
