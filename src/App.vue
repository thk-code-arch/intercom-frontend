<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div id="app">
    <header-menu v-if="showDiv" />
    <router-view :key="$route.path" />
    <notifications
      position="bottom left"
      width=""
      classes="m-6 p-3 text-black bg-red-500 rounded-lg border-solid border-l-8 border-red-700"
      group="error"
    />
    <notifications
      position="bottom left"
      width=""
      classes="m-6 p-3 text-gray-100 bg-codearch-500 rounded-lg border-solid border-l-8 border-codearch-700"
      group="info"
    />
  </div>
</template>
<script>
import HeaderMenu from "./components/header/HeaderMenu";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    HeaderMenu,
  },
  computed: {
    showDiv() {
      return !this.$route.path.startsWith("/login") && this.$route.path !== "/register";
    },
    showSidebar() {
      return this.$route.path == "/view";
    },
    chatroomid() {
      return this.$store.state.chatroom.currentchatroom;
    },
    viewportid() {
      return this.$store.state.viewport.currentviewport;
    },
    //TODO add delete localstorage when JWT Token is expired
  },
  watch: {
    chatroomid: function (newVal, oldVal) {
      // TODO dispatch load chatlog on change
      this.$store.dispatch("chatroom/load_chatlog", oldVal);
      console.log(newVal);
    },
  },
  created() {
    //set <header title>
    document.title = `InterCOM`;
    // relogin after JWT expire
  },
};
</script>
<style>
#app {
  font-family: din-2014;
}

.h-screen2 {
  height: calc(100vh - var(--header-height)) !important;
}
.max-h-screen2 {
  height: calc(100vh - var(--header-height)) !important;
}
.btn {
  @apply font-bold py-2 px-4 rounded;
}
.btn-blue {
  @apply bg-gray-500 text-white;
}
.btn-blue:hover {
  @apply bg-codearch-500;
}
.notification-title {
  @apply text-xl;
}

.notification-content {
  @apply text-sm;
}
</style>
