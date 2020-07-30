<template>
<body class="h-screen antialiased bg-gray-200" id="app">
      <header-menu v-if="showDiv"/>
      <router-view/>
</body>
</template>
<script>

import axios from 'axios';
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
	axios.interceptors.response.use(function (response) {
    return response
    }, function (error) {
    console.log(error.response.data)
    if (error.response.data.error.statusCode === 401) {
        this.$store.dispatch('auth/logout');
        this.$router.push('/login');
    }
    return Promise.reject(error)
})
}
}
</script>
<style>
#app {
  font-family: din-2014;
}


</style>
