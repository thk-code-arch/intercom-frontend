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
    }
//TODO add delete localstorage when JWT Token is expired
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


</style>
