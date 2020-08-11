<template>
<div class="bg-gray-200" id="app">
      <header-menu v-if="showDiv"/>
      <router-view/>
</div>
</template>
<script>

import HeaderMenu from "./components/HeaderMenu";
export default {
  name: "App",
  data() {
    return {
    };
  },
  components: {
      HeaderMenu,
  },
computed:{
    showDiv() {
        return this.$route.path !== '/login' && this.$route.path !== '/register';
    },
    showSidebar() {
        return this.$route.path == '/view'
    },
    chatroomid() {
    return this.$store.state.chatroom.currentchatroom
    }
//TODO add delete localstorage when JWT Token is expired
  },
  watch: {
    chatroomid: function(newVal, oldVal) { // watch it
      console.log('chatroomid  changed: ', newVal, ' | was: ', oldVal)
      // TODO dispatch load chatlog on change
      this.$store.dispatch('chatroom/load_chatlog',oldVal);
    }
  },
created () {
    //set <header title>
	document.title = "InterCom";
	// relogin after JWT expire
}
}
</script>
<style>
#app {
  font-family: din-2014;
}

.h-screen2{
    height:calc(100vh - 6rem)!important;
  }

</style>
